import "bootstrap/dist/css/bootstrap.min.css";
import "./Resume.css";
import { useEffect, useState } from "react";
import { request } from "../../request/index";
import { format } from "date-fns";

interface Category {
  _id: string;
  workName: string;
  companyName: string;
  startDate: string;
  description: string;
  endDate: string;
  level: string;
  name: string;
}

const Resume = () => {
  // const [experience, setExperience] = useState<Category[]>([]);
  // const [education, setEducation] = useState<Category[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let { data } = await request.get(
  //         "experiences?user[in]=64395a65ea542e4adcff0f06"
  //       );
  //       let categordata = data.data;
  //       // console.log(categordata);
  //       setExperience(categordata);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   const fetchDatas = async () => {
  //     try {
  //       let { data } = await request.get(
  //         "education?user=64dddfabdccb1b00143b2e85"
  //       );
  //       let categordatas = data.data;
  //       // console.log(categordata);
  //       setEducation(categordatas);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  //   fetchDatas();
  // }, []);
  // console.log(experience);

  const [experience, setExperience] = useState<Category[]>([]);
  const [education, setEducation] = useState<Category[]>([]);

  const fetchData = async (
    endpoint: string,
    setter: (data: Category[]) => void
  ) => {
    try {
      const { data } = await request.get(endpoint);
      const categoryData = data.data;
      setter(categoryData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData("experiences?user=64e09da7108b410014f1e255", setExperience);
    fetchData("education?user=64e09da7108b410014f1e255", setEducation);
  }, []);

  // console.log(experience);
  // console.log(education);

  return (
    <section id="resume" className="resume section-show">
      <div className="container">
        <div className="section-title">
          <h2>Resume</h2>
          <p>Check My Resume</p>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <h3 className="resume-title">Sumary</h3>
            <div className="resume-item pb-0">
              <h4>Xakimov Eldorbek</h4>
              <p>
                <em>
                  Currently, I am a 3rd year student at the Tashkent University
                  of Information Technologies, and I also successfully graduated
                  from Najot Talim Frontend courses.
                </em>
              </p>
              <p></p>
              <ul>
                <li>Tashkent city , Namangan region</li>
                <li>+998934952717</li>
                <li> eldorbekxakimov6@gmail.com</li>
              </ul>
              <p></p>
            </div>

            <h3 className="resume-title">Education</h3>
            {education?.map((pr) => (
              <div key={pr._id} className="resume-item">
                <h4>{pr.name}</h4>
                <h5>
                  {format(new Date(pr.startDate), "MMM d , yyyy")} -{" "}
                  {format(new Date(pr.endDate), "MMM d , yyyy")}
                </h5>
                <p>
                  <em> {pr.level}</em>
                </p>
                <p>{pr.description}</p>
              </div>
            ))}
          </div>
          <div className="col-lg-6">
            <h3 className="resume-title">Professional Experience</h3>
            {experience?.map((pr) => (
              <div key={pr._id} className="resume-item">
                <h4>{pr.workName} specialist</h4>
                <h5>
                  {" "}
                  {format(new Date(pr.startDate), "MMM d , yyyy")} - Start
                </h5>
                {"-"}
                <h5>{format(new Date(pr.endDate), "MMM d , yyyy")} - End</h5>
                <p>
                  <em>{pr.companyName} </em>
                </p>
                <p></p>
                <ul>
                  <li>{pr.description}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
