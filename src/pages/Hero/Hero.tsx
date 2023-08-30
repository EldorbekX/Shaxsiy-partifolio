import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import Illustration from "../../assets/illustration.svg";
import { Container } from "./styles";
import { Containers } from "../../styles";
export function Hero() {
  return (
    <Containers>
      <Container className="container" id="home">
        <div className="hero-text">
          <p>Hello 👋, I am</p>
          <h1>Xakimov Eldorbek</h1>
          <h3>Frontend Developer</h3>
          <p className="small-resume">
            I'm a computer technician with a focus on web development with
            JavaScript.
          </p>
          <NavLink to="/contact" className="button">
            Contact
          </NavLink>
        </div>
        <div className="hero-image">
          <img src={Illustration} alt="Ilustração" />
        </div>
      </Container>
    </Containers>
  );
}
