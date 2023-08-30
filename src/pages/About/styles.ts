import styled from "styled-components";

export const Container = styled.section`
  margin-top: 12rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;

  .hard-skills {
    margin-top: 1.6rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.8rem;
  }
  .hability {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 3.4rem;
    }
  }
  .anticon {
    color: var(--green);
    font-weight: bold;
  }
  .ant-pagination-item  {
    border: 2px solid var(--green);
  }
  .ant-pagination-item a {
    color: var(--green);
    font-weight: bold;
  }
  h2 {
    display: inline-block;
    margin-bottom: 2rem;
    border-bottom: 0.2rem solid var(--blue);
  }

  h3 {
    margin-top: 2rem;
    color: var(--green);
  }

  p {
    font-size: 1.8rem;
    letter-spacing: 0.1rem;
    font-weight: 500;
  }
  .ant-progress-text {
    color: white;
  }
  .titletex {
    width: 100%;
  }
  .about-text {
    text-align: center;
  }
  .about-image {
    text-align: center;
    img {
      margin-top: 2rem;
      width: 200px;
      filter: grayscale(1);
      transition: filter 0.5s;
      border-radius: 30%;

      &:hover {
        filter: grayscale(0);
      }
    }
  }

  @media only screen and (max-width: 480px) {
    .about-image {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 100%;
      margin-top: 5rem;
    }
  }

  @media (max-width: 960px) {
    display: block;
    text-align: center;

    .about-image {
      display: flex;
    }
    .hard-skills {
      justify-content: center;
    }
  }
`;
