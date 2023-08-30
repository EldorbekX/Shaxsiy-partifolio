import { request } from "../../request/index";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import "./register.css";
import { Containers } from "../../styles";
import Loading from "../../components/loading/loading";

interface RegisterParams {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const register = async ({
    firstName,
    lastName,
    username,
    password,
  }: RegisterParams) => {
    const form = { firstName, lastName, username, password };
    console.log(form);
    try {
      setLoading(true);
      const res = await request.post("auth/register", form);
      console.log(res);
      navigate("/login");
    } catch (err) {
      console.log("Error:", err);
      if (err) {
        console.log("Response:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const formItemLayout = {
    labelCol: {
      md: { span: 6 },
    },
  };

  return (
    <Containers>
      <div style={{ marginTop: "70px" }} className="rounded mb-6">
        <div className="contregister">
          <h2
            style={{ marginTop: "20px", color: "white" }}
            className="containr text-center text-4xl py-5 font-semibold"
          >
            Registratsiya
          </h2>
          <Form
            name="register"
            onFinish={register}
            {...formItemLayout}
            className="text-center"
          >
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please input your firstname!" },
              ]}
              hasFeedback
            >
              <Input style={{ height: "50px" }} placeholder="Firstname" />
            </Form.Item>

            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: "Please input your lastName!" },
              ]}
              hasFeedback
            >
              <Input style={{ height: "50px" }} placeholder="Lastname" />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              hasFeedback
            >
              <Input style={{ height: "50px" }} placeholder="username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              hasFeedback
            >
              <Input.Password
                style={{ height: "50px" }}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                style={{ height: "50px" }}
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Button
              loading={loading}
              htmlType="submit"
              className="bg-white mx-auto w-1/3 my-3 h-10 text-lg "
            >
              {loading ? <Loading/> : "Register"}
            </Button>
          </Form>
        </div>
      </div>
    </Containers>
  );
};

export default Register;
