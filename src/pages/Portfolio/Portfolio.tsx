import { Container } from "./styles";
import { Containers } from "../../styles";
import githubIcon from "../../assets/github-icon.svg";
import externalLinkIcon from "../../assets/external-link-icon.svg";
import { request } from "../../request";
import { useCallback, useEffect, useState } from "react";
import { IMG_URL } from "../../constants";
import Loading from "../../components/loading/loading";

interface SkillsTypes {
  url: string;
  name: string;
  _id: string;
}

interface SkillsType {
  _id: string;
  name: string;
  description: string;
  url: string;
  photo: SkillsTypes;
}

export function Portfolio() {
  const [myskills, setMyskills] = useState<SkillsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSkills = useCallback(async () => {
    try {
      const { data } = await request.get(
        `portfolios?user=64e09da7108b410014f1e255`
      );
      // console.log(data);
      setMyskills(data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getSkills();
  }, [getSkills]);

  return (
    <Containers>
      <Container id="portfolio">
        <h2>My portfolio</h2>
        {isLoading ? ( // Ma'lumotlar yuklanayotgan payt
          <div className="loading-container">
            <Loading />
          </div>
        ) : (
          <div className="projects">
            {myskills?.map((pr) => (
              <div key={pr._id} className="project">
                <header>
                  {pr.photo ? (
                    <img
                      id="mypostimg"
                      src={`${IMG_URL}${pr.photo._id}.${
                        pr.photo.name.split(".")[1]
                      }`}
                    />
                  ) : (
                    <div>No Image Available</div>
                  )}
                  <div className="project-links">
                    <a href={pr.url} target="_blank" rel="noreferrer">
                      <img src={githubIcon} alt="Visitar site" />
                    </a>
                    <a href={pr.url} target="_blank" rel="noreferrer">
                      <img src={externalLinkIcon} alt="Visitar site" />
                    </a>
                  </div>
                </header>
                <div className="body">
                  <h3>{pr.name}</h3>
                  <p>{pr.description}</p>
                </div>
                <footer>
                  <ul className="tech-list">
                    <li>Html</li>
                    <li>Css</li>
                    <li>JavaSript</li>
                  </ul>
                </footer>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Containers>
  );
}
