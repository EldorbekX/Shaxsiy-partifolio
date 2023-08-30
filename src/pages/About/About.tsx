import { Container } from "./styles";
import { Progress, Pagination } from "antd";
import cssIcon from "../../assets/css-icon.svg";
import htmlIcon from "../../assets/html-icon.svg";
import jsIcon from "../../assets/js-icon.svg";
import nodeIcon from "../../assets/node-icon.svg";
import reactIcon from "../../assets/react-icon.svg";
import typescriptIcon from "../../assets/typescript-icon.svg";
import bootsrapIcon from "../../assets/bootstrap-icon.svg";
import nexticon from "../../assets/Rlogical-Blog-Images-thumbnail.webp";
import partifolImg from "../../assets/photo_2023-07-27_18-07-13.jpg";
import { useEffect, useState } from "react";
import { request } from "../../request/index";
import { Containers } from "../../styles";
interface Category {
  _id: string;
  name: string;
  percent: number;
}

export function About() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await request.get(
          `skills?user=64e09da7108b410014f1e255`
        );
        const categordata = data.data;
        // console.log(categordata);
        setCategories(categordata);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedTeachers = categories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  console.log(setPageSize);

  return (
    <div className="container Cardsp">
      <Containers>
        <Container id="sobre">
          <div className="titletex">
            <h2>Skills</h2>
            {paginatedTeachers?.map((pr) => (
              <div key={pr._id}>
                <p className="font-medium">{pr.name}</p>
                <Progress percent={pr.percent} />
              </div>
            ))}
            <div className="paganation">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={categories.length} // Ma'lumotlar to'plami uzunligi
                showSizeChanger={false} // Elementlar sonini o'zgartirish imkoniyatini o'chirish
                onChange={handlePageChange}
                style={{ padding: "10px" }}
              />
            </div>
          </div>
          <div className="abouthom">
            <div className="about-image">
              <img src={partifolImg} alt="Imagem de perfil" />
            </div>
            <div className="about-text">
              <h2>LEARN MORE ABOUT ME</h2>
              <p>
                My name is Xakimov Eldorbek, I am a computer technician with a
                great passion for programming. I am passionate about delivering
                solutions that add to people's lives and at the same time
                challenge me. I improved my skills as a Front-End developer and
                back end
              </p>

              <h3>Here are my main skills:</h3>

              <div className="hard-skills">
                <div className="hability">
                  <img className="imageabaut" src={reactIcon} alt="React" />
                </div>

                <div className="hability">
                  <img src={jsIcon} alt="JavaScript" />
                </div>
                <div className="hability">
                  <img src={bootsrapIcon} alt="bootsrap" />
                </div>
                <div className="hability">
                  <img src={htmlIcon} alt="Html" />
                </div>

                <div className="hability">
                  <img src={cssIcon} alt="Css" />
                </div>
                <div className="hability">
                  <img src={nodeIcon} alt="Node" />
                </div>

                <div className="hability">
                  <img src={typescriptIcon} alt="Typescript" />
                </div>
                <div className="hability">
                  <img src={nexticon} alt="next" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Containers>
    </div>
  );
}
