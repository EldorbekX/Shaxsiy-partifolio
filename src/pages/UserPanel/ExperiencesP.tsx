import { useEffect, useState, useCallback } from "react";
import { Modal, Form, Input, Button } from "antd";
import { request } from "../../request/index";
import { Pagination } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AdjustIcon from "@mui/icons-material/Adjust";

import "./table.css";
import Loading from "../../components/loading/loading";
import { format } from "date-fns";
interface SkillsType {
  _id: string;
  workName: string;
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
}

const ExperiencesP = () => {
  const { Search } = Input;
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();
  const [myskills, setMyskills] = useState<SkillsType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const albumId = localStorage.getItem("AlbomID");

  const getSkills = useCallback(async () => {
    try {
      if (albumId) {
        // Shartni qo'shing
        const { data } = await request.get(`experiences?user[in]=${albumId}`);
        console.log(data);
        setMyskills(data.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(true);
    }
  }, [albumId]);

  useEffect(() => {
    getSkills();
  }, [getSkills]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const submit = async () => {
    try {
      const values = await form.validateFields();
      // console.log(values);
      if (selected) {
        await request.put(`experiences/${selected}`, values);
      } else {
        await request.post("experiences", values);
      }
      form.resetFields();
      hideModal();
      getSkills();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  async function editTeacher(id: string) {
    const { data } = await request.get(`experiences/${id}`);
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
      pr.workName && // Add null/undefined checks
      pr.workName.toLowerCase().includes(search.toLowerCase())
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
          await request.delete(`experiences/${id}`);
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
          title="Adding Experiences"
          open={isModalOpen}
          onOk={submit}
          okText={selected ? "Save" : "Add"}
          onCancel={hideModal}
        >
          <Form
            initialValues={{
              isMarried: false,
            }}
            form={form}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              name="workName"
              label="WorkName"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}
            >
              <Input placeholder="WorkName a name" />
            </Form.Item>
            <Form.Item
              name="companyName"
              label="CompanyName"
              rules={[
                {
                  required: true,
                  message: "CompanyName is required",
                },
              ]}
            >
              <Input placeholder="Enter a level" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "description is required",
                },
              ]}
            >
              <Input placeholder="Description" />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                name="startDate"
                label="StartDate"
                rules={[
                  {
                    required: true,
                    message: "StartDate is required",
                  },
                ]}
              >
                <Input type="date" placeholder="StartDate" />
              </Form.Item>
              <Form.Item
                name="endDate"
                label="EndDate"
                rules={[
                  {
                    required: true,
                    message: "EndDate is required",
                  },
                ]}
              >
                <Input type="date" placeholder="EndDate" />
              </Form.Item>
            </div>
          </Form>
        </Modal>
        <section className="skills">
          {isLoading ? ( // Ma'lumotlar yuklanayotgan payt
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            <div className="container">
              <div className="row">
                {paginatedTeachers?.map((pr) => (
                  <div key={pr._id} className="experience">
                    <div className="card ">
                      <div className="card-body px-5">
                        <h4 className="title">Experience</h4>
                        <section className="px-1 vert-hr">
                          <h5 className="mb-1">
                            <span className="fa-stack title-dot">
                              <AdjustIcon />
                            </span>
                            {pr.companyName}
                          </h5>

                          <h5 className="font-weight-bolder">
                            User Experience {pr.workName}
                            <span className="font-weight-light">
                              &nbsp;|&nbsp;{" "}
                              {format(new Date(pr.startDate), "MMM d , yyyy")}{" "}
                              &ndash; Start time
                            </span>
                          </h5>
                          <h5 className="font-weight-bolder">
                            User Experience {pr.workName}
                            <span className="font-weight-light">
                              &nbsp;|&nbsp;{" "}
                              {format(new Date(pr.endDate), "MMM d , yyyy")}{" "}
                              &ndash; End time
                            </span>
                          </h5>
                          <p className="card-text">{pr.description}</p>
                        </section>
                        <div className="main-description">
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
                          <Button
                            onClick={() => deleteTeacher(pr._id)}
                            className="tag__item"
                          >
                            <DeleteOutlined
                              style={{ fontSize: "26px", color: "red" }}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

export default ExperiencesP;
