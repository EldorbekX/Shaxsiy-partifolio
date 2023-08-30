import { useEffect, useState, useCallback } from "react";
import { Modal, Form, Input, Button } from "antd";

import { request } from "../../request/index";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Loading from "../../components/loading/loading";
interface SkillsType {
  _id: string;
  name: string;
  description: string;
  level: string;
  startDate: string;
  endDate: string;
}
import "./table.css";
import { format } from "date-fns";

const EducationsP = () => {
  const { Search } = Input;
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();
  const [myskills, setMyskills] = useState<SkillsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const albumId = localStorage.getItem("AlbomID");

  const getSkills = useCallback(async () => {
    try {
      if (albumId) {
        // Shartni qo'shing
        const { data } = await request.get(`education?user=${albumId}`);
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
        await request.put(`education/${selected}`, values);
      } else {
        await request.post("education", values);
      }
      form.resetFields();
      hideModal();
      getSkills();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  async function editTeacher(id: string) {
    const { data } = await request.get(`education/${id}`);
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

  function deleteTeacher(id: string) {
    Modal.confirm({
      title: "Do you Want to delete this post?",
      onOk: async () => {
        try {
          await request.delete(`education/${id}`);
          getSkills();
        } catch (err) {
          console.log(err);
        }
      },
    });
  }

  
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
          title="Adding Educations"
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
              name="level"
              label="Level"
              rules={[
                {
                  required: true,
                  message: "level is required",
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
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Description</th>
                  <th>StartDate</th>
                  <th>EndDate</th>
                  <th></th>
                </tr>
              </thead>

              {filteredProduct?.map((pr) => (
                <tbody key={pr._id}>
                  <tr>
                    <td data-label="Name">{pr.name}</td>
                    <td data-label="Level">{pr.level}</td>
                    <td data-label="Description">{pr.description}</td>
                    <td data-label="StartDate">
                      {format(new Date(pr.startDate), "MMM d , yyyy")}
                    </td>
                    <td data-label="endDate">
                      {format(new Date(pr.endDate), "MMM d , yyyy")}
                    </td>
                    <td data-label="Value" className="button-td">
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
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </section>
      </div>
    </section>
  );
};

export default EducationsP;
