import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout";
import ExperiencesP from "./pages/UserPanel/ExperiencesP";
import SkillsP from "./pages/UserPanel/SkillsP";
import MessagesP from "./pages/UserPanel/MessagesP";
import AccountP from "./pages/UserPanel/AccountP";
import { Hero } from "./pages/Hero/Hero";
import { About } from "./pages/About/About";
import Resume from "./pages/Resume/Resume";
import { Portfolio } from "./pages/Portfolio/Portfolio";
import { GlobalStyle } from "./styles/global";
import { Fragment, useCallback } from "react";
import Particles from "react-tsparticles";
// import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import { Contact } from "./pages/Contact/Contact";
import Login from "./pages/login/login";
import Register from "./pages/Register/page";
import DashboardP from "./pages/DashboardP";
import NotFoundP from "./pages/NotFoundP";
import Userlayout from "./components/layout/Userlayout";
import Portfolios from "./pages/UserPanel/Portfolios";
import EducationsP from "./pages/UserPanel/EducationsP";
import { useAuth } from "./states/auth";
// import { AuthContext } from "./context/AuthContext";

function App() {
  // const { isAuthenticated } = useContext(AuthContext);
  const { isAuthenticated } = useAuth();

  const particlesInit = useCallback(async () => {}, []);

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.6,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <BrowserRouter>
        <GlobalStyle></GlobalStyle>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Hero />} />
            <Route path="about" element={<About />} />
            <Route path="resume" element={<Resume />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="contact" element={<Contact />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
          {isAuthenticated && (
            <Route path="/" element={<Userlayout />}>
              <Route path="account" element={<AccountP />} />
              <Route path="education" element={<EducationsP />} />
              <Route path="experiences" element={<ExperiencesP />} />
              <Route path="messages" element={<MessagesP />} />
              <Route path="skills" element={<SkillsP />} />
              <Route path="portfolios" element={<Portfolios />} />
            </Route>
          )}
          {isAuthenticated && (
            <Fragment>
              <Route path="/" element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardP />} />
              </Route>
            </Fragment>
          )}
          <Route path="*" element={<NotFoundP />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
