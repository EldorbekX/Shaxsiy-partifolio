import { Container } from "./styles";

import reactIcon from "../../assets/react-icon.svg";
import linkedinIcon from "../../assets/linkedin.png";
import githubIcon from "../../assets/github.png";
import instagramIcon from "../../assets/instagram.png";
import telegremIcon from "../../assets/2504941.png";

export function Footer() {
  return (
    <Container className="footer">
      <a href="/" className="logo">
        <span>J</span>
        <span>Tulio</span>
      </a>
      <div>
        <p>
          Este site foi feito com <img src={reactIcon} alt="React" /> e muito
          <span>❤️</span>
        </p>
      </div>

      <div className="social-media">
        <a href="https://t.me/xakimovE" target="_blank" rel="noreferrer">
          <img src={telegremIcon} alt="telegrem" />
        </a>

        <a href="https://github.com/EldorbekX" target="_blank" rel="noreferrer">
          <img src={githubIcon} alt="GitHub" />
        </a>

        <a
          href="https://instagram.com/xakimoveldorbek7?utm_source=qr&igshid=NGExMmI2YTkyZg%3D%3D"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagramIcon} alt="Instagram" />
        </a>
        <a href="#bbdsh" target="_blank" rel="noreferrer">
          <img src={linkedinIcon} alt="Linkedin" />
        </a>
      </div>
    </Container>
  );
}
