import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import { validationResult, body } from "express-validator";

// ROUTERS
import jobRouter from "./routes/jobRouter.js";

// MIDDLEWARE
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post(
  "/api/v1/test",
  [body("name").notEmpty().withMessage("name is required")],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
  (req, res) => {
    const { name } = req.body;
    res.json({ msg: `hello ${name}` });
  }
);

app.use("/api/v1/jobs", jobRouter);

//NOT FOUND MIDDLEWARE
//SPECIFICALLY DESIGNED TO HANDLE REQUESTS FOR NON-EXISTENT ROUTES
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

//ERROR MIDDLEWARE
//A CATCH-ALL FOR HANDLING UNEXPECTED ERRORS THAT OCCUR DURING REQUEST PROCESSING
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
