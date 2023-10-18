import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";

//ROUTERS
import jobRouter from "./routes/jobRouter.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log(req);

  res.json({ message: "Data received", data: req.body });
});

app.use("/api/v1/jobs", jobRouter);

//NOT FOUND MIDDLEWARE
//SPECIFICALLY DESIGNED TO HANDLE REQUESTS FOR NON-EXISTENT ROUTES
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

//ERROR MIDDLEWARE
//A CATCH-ALL FOR HANDLING UNEXPECTED ERRORS THAT OCCUR DURING REQUEST PROCESSING
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`server running on PORT ${port}...`);
});
