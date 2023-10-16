import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <div>
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              Job <span>Tracking</span> App
            </h1>
            <p>
              Introducing Job App - the ultimate job application management
              tool. With this intuitive interface, you can effortlessly track
              and manage all your job applications in one place. Stay on top of
              interview schedules while optimizing your job search strategy.
              Take control of your job search with this beautiful stylized job
              tracker! Your dream job is within reach, and this app will help
              you get there faster and with confidence!
            </p>
            <Link to="/register" className="btn register-link">
              Register
            </Link>
            <Link to="/login" className="btn">
              Login / Demo User
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </div>
  );
};

export default Landing;
