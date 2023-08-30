import { Container } from "./styles";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

// import Curriculo from "../../assets/CV_JoaoTulio.pdf";
export function Header() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  function toggleTheme() {
    const html = document.getElementsByTagName("html")[0];
    html.classList.toggle("light");
  }

  function closeMenu() {
    setActive(false);
  }

  const logOutsayt = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    navigate("/login"); // Redirect the user to the login page after logout
  };

  console.log(isAuthenticated);

  return (
    <Container className="header-fixed">
      <NavLink to="#home" className="logo">
        <span>J</span>
        <span>Tulio</span>
      </NavLink>

      <input
        onChange={toggleTheme}
        className="container_toggle"
        type="checkbox"
        id="switch"
        name="mode"
      />
      <label htmlFor="switch">Toggle</label>
      <nav className={isActive ? "active" : ""}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/about" onClick={closeMenu}>
          ABOUT ME
        </NavLink>
        <NavLink to="/resume" onClick={closeMenu}>
          Resume
        </NavLink>
        <NavLink to="/portfolio" onClick={closeMenu}>
          Portfólio
        </NavLink>
        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>
        <NavLink
          to={isAuthenticated ? "/portfolios" : "/login"}
          onClick={closeMenu}
        >
          {isAuthenticated ? "Create" : "Login"}
        </NavLink>
        <NavLink to="/register" onClick={closeMenu}>
          Register
        </NavLink>
        <button
          style={{ backgroundColor: "transparent", border: "none" }}
          onClick={logOutsayt}
        >
          <LoginOutlined
            style={{ fontSize: "30px", color: "white", fontWeight: "bold" }}
          />
        </button>
        <a href="#ksks" download className="button">
          CV
        </a>
      </nav>

      <div
        aria-expanded={isActive ? "true" : "false"}
        aria-haspopup="true"
        aria-label={isActive ? "Fechar menu" : "Abrir menu"}
        className={isActive ? "menu active" : "menu"}
        onClick={() => {
          setActive(!isActive);
        }}
      ></div>
    </Container>
  );
}
