import { useEffect, useState, useCallback } from "react";
import { Modal, Form, Input, Button } from "antd";
import { request } from "../../request/index";
import { Pagination } from "antd";
import { Container } from "../Portfolio/styles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Loading from "../../components/loading/loading";
import { IMG_URL } from "../../constants";
import githubIcon from "../../assets/github-icon.svg";
import externalLinkIcon from "../../assets/external-link-icon.svg";
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

const Portfolios = () => {
  const { Search } = Input;
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();
  const [myskills, setMyskills] = useState<SkillsType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [uplodImg, setUplodImg] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const albumId = localStorage.getItem("AlbomID");

  const getSkills = useCallback(async () => {
    try {
      if (albumId) {
        // Shartni qo'shing
        const { data } = await request.get(`portfolios?user=${albumId}`);
        // console.log(data);
        setMyskills(data.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [albumId]);

  useEffect(() => {
    getSkills();
  }, [getSkills]);



  const handleChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFile = e.target.files?.[0];

      if (selectedFile) {
        const form = new FormData();
        form.append("file", selectedFile);
        const data = await request.post("upload", form);
        setUplodImg(data?.data?._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const submit = async () => {
    try {
      const values = await form.validateFields();
      values.photo = uplodImg;
      console.log(values);
      if (selected) {
        await request.put(`portfolios/${selected}`, values);
      } else {
        await request.post("portfolios", values);
      }
      form.resetFields();
      hideModal();
      getSkills();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  async function editTeacher(id: string) {
    const { data } = await request.get(`portfolios/${id}`);
    console.log(data);
    form.setFieldsValue(data);
    setSelected(id);
    showModal();
  }

  const openModal = () => {
    showModal();
    form.resetFields();
    setSelected(null);
  };

  const filteredProduct = myskills.filter(
    (pr) =>
      pr &&
      pr.name && // Add null/undefined checks
      pr.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedTeachers = filteredProduct.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function deleteTeacher(id: string) {
    Modal.confirm({
      title: "Do you Want to delete this post?",
      onOk: async () => {
        try {
          await request.delete(`portfolios/${id}`);
          getSkills();
        } catch (err) {
          console.log(err);
        }
      },
    });
  }
  console.log(setPageSize);
  return (
    <section className="slider">
      <div className="container">
        <div className="slider-paragraph" style={{ marginTop: "40px" }}>
          <Search
            placeholder="input search text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="serch"
          />
          <Button onClick={openModal}>Add</Button>
        </div>
        <Modal
          title="Adding Portfolios"
          open={isModalOpen}
          onOk={submit}
          okText={selected ? "Save" : "Add"}
          onCancel={hideModal}
        >
          <input type="file" onChange={handleChangeImg} />
          <Form
            initialValues={{
              isMarried: false,
            }}
            form={form}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}
            >
              <Input placeholder="Enter a name" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Percent is required",
                },
              ]}
            >
              <Input placeholder="Description" />
            </Form.Item>
            <Form.Item
              name="url"
              label="Url"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}
            >
              <Input placeholder="Url" />
            </Form.Item>
          </Form>
        </Modal>
        <section className="partifolo">
          {isLoading ? ( // Ma'lumotlar yuklanayotgan payt
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            <Container id="portfolio">
              <div className="projects">
                {paginatedTeachers?.map((pr) => (
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
                      <ul
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                        className="tech-list"
                      >
                        <li>
                          {" "}
                          <Button
                            onClick={() => editTeacher(pr._id)}
                            className="tag__item"
                          >
                            <EditOutlined
                              style={{
                                fontSize: "26px",
                                color: "green",
                                gap: "15px",
                              }}
                            />
                          </Button>
                        </li>
                        <li>
                          <Button
                            onClick={() => deleteTeacher(pr._id)}
                            className="tag__item"
                          >
                            <DeleteOutlined
                              style={{ fontSize: "26px", color: "red" }}
                            />
                          </Button>
                        </li>
                      </ul>
                    </footer>
                  </div>
                ))}
              </div>
            </Container>
          )}
        </section>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <div className="paganation">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredProduct.length} // Ma'lumotlar to'plami uzunligi
              showSizeChanger={false} // Elementlar sonini o'zgartirish imkoniyatini o'chirish
              onChange={handlePageChange}
              style={{ padding: "10px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolios;
