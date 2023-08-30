import { Container } from "./styles";
import emailIcon from "../../assets/email-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg";
import { Form } from "../Form/Form";
import { Containers } from "../../styles";

export function Contact() {
  return (
    <Containers>
      <Container id="contato">
        <header>
          <h2>Contact me</h2>
          <p>
            If you saw my potential or want to talk to me, don't hesitate to
            send me a message.
          </p>
        </header>
        <div className="contacts">
          <div>
            <img src={emailIcon} alt="Email" />
            <a href="https://eldorbekxakimov6@gmail.com">
            eldorbekxakimov6@gmail.com
            </a>
          </div>
          <div>
            <img src={phoneIcon} alt="Email" />
            <a href="tel:+998934952717">+998-93-4952717</a>
          </div>
        </div>
        <Form />
      </Container>
    </Containers>
  );
}
