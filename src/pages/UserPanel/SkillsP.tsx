import { useEffect, useState, useCallback } from "react";
import { Modal, Form, Input, Button } from "antd";
import { request } from "../../request/index";
import { Progress, Space, Pagination } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Loading from "../../components/loading/loading";
interface SkillsType {
  _id: string;
  name: string;
  percent: number;
}

const SkillsP = () => {
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
        const { data } = await request.get(`skills?user=${albumId}`);
        // console.log(data);
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
        await request.put(`skills/${selected}`, values);
      } else {
        await request.post("skills", values);
      }
      form.resetFields();
      hideModal();
      getSkills();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  async function editTeacher(id: string) {
    const { data } = await request.get(`skills/${id}`);
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
          await request.delete(`skills/${id}`);
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
          title="Adding Skills"
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
              name="percent"
              label="Percent"
              rules={[
                {
                  required: true,
                  message: "Percent is required",
                },
              ]}
            >
              <Input type="number" placeholder="Enter number" />
            </Form.Item>
          </Form>
        </Modal>
        <section className="skills">
          {isLoading ? ( // Ma'lumotlar yuklanayotgan payt
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            <div className="skills__container grid">
              {paginatedTeachers?.map((pr) => (
                <div key={pr._id} id="card" className="card">
                  <div className="card-header"> {pr.name}</div>
                  <div className="card-main">
                    <Space wrap>
                      <Progress type="circle" percent={pr.percent} />
                    </Space>
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
              ))}
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

export default SkillsP;
