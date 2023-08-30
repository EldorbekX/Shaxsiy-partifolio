import { useState } from "react";
import { ROLE, TOKEN, USER } from "../../constants/index";
import { request } from "../../request/index";

import { Button, Form, Input } from "antd";
// import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Containers } from "../../styles";
import Loading from "../../components/loading/loading";
// import { useAuth } from "../../states/auth";

// import { AuthContext } from "../../context/AuthContext";

interface FormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  // const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  // const { setIsAuthenticated } = useContext(AuthContext);
  // const navigate = useNavigate();

  const login = async (form: FormValues) => {
    try {
      setLoading(true);
      const {
        data: { token, user },
      } = await request.post("auth/login", form);
      // isAuthenticated(true);
      console.log(user);
      const Rols = user?.role;
      localStorage.setItem(`AlbomID`, user._id);
      if (Rols === "admin") {
        // navigate("/dashboard");
        window.location.href = "/dashboard";
      } else if (Rols === "client") {
        // navigate("/experiences");
        window.location.href = "/experiences";
      } else if (Rols === "user") {
        alert("Siz Clint emassiz adminga murojat qiling!");
      }

      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, Rols);
      Cookies.set(USER, user);
      // Cookies.set(EXPIRE_DATE, expire);
      console.log(token);
    } catch (err) {
      console.log(
        "Please enter your information in detail and correctly.",
        err
      );
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
      <div id="login" style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{ marginTop: "200px", width: "400px" }}
          className="loginInput text-center"
        >
          <h2 className="containr text-center text-4xl py-5 font-semibold">
            LogIn
          </h2>
          <Form
            name="login"
            onFinish={login}
            {...formItemLayout}
            className="text-center"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              hasFeedback
            >
              <Input
                style={{ height: "50px" }}
                placeholder="username"
                className="w-1/2 border mb-3"
              />
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
                placeholder="password"
                className="w-1/2 border mb-3"
              />
            </Form.Item>
            <div className="buttonlogin">
              <Button htmlType="submit" disabled={loading}>
                {loading ? <Loading /> : "Login"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Containers>
  );
};

export default Login;

// import React, { useContext, useState } from "react";
// import { request } from "../../request/index";
// import { Button, Form, Input } from "antd";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { Containers } from "../../styles";
// import Loading from "../../components/loading/loading";

// interface FormValues {
//   username: string;
//   password: string;
// }

// const Login: React.FC = () => {
//   const { setIsAuthenticated } = useContext(AuthContext);
//   const [loading, setLoading] = useState<boolean>(false);
//   const navigate = useNavigate();

//   const login = async (form: FormValues) => {
//     try {
//       setLoading(true);
//       const {
//         data: { token, user },
//       } = await request.post("auth/login", form);

//       const Rols = user?.role;
//       localStorage.setItem(`AlbomID`, user._id);
// console.log(Rols);

//       setIsAuthenticated(true);

//       if (Rols === "admin") {
//         navigate("/dashboard");
//       } else if (Rols === "client") {
//         navigate("/account");
//       } else if (Rols === "user") {
//         alert("Siz Client emassiz, adminga murojat qiling!");
//       }

//       localStorage.setItem(`TOKEN`, token);
//       localStorage.setItem(`ROLE`, Rols);
//       localStorage.setItem(`USER`, JSON.stringify(user)); // Serialize user object
//     } catch (err) {
//       console.log(
//         "Please enter your information in detail and correctly.",
//         err
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formItemLayout = {
//     labelCol: {
//       md: { span: 6 },
//     },
//   };

//   return (
//     <Containers>
//       <div id="login" style={{ display: "flex", justifyContent: "center" }}>
//         <div
//           style={{ marginTop: "200px", width: "400px" }}
//           className="loginInput text-center"
//         >
//           <h2 className="containr text-center text-4xl py-5 font-semibold">
//             LogIn
//           </h2>
//           <Form
//             name="login"
//             onFinish={login}
//             {...formItemLayout}
//             className="text-center"
//           >
//             <Form.Item
//               name="username"
//               rules={[
//                 { required: true, message: "Please input your username!" },
//               ]}
//               hasFeedback
//             >
//               <Input
//                 style={{ height: "50px" }}
//                 placeholder="username"
//                 className="w-1/2 border mb-3"
//               />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               rules={[
//                 { required: true, message: "Please input your password!" },
//               ]}
//               hasFeedback
//             >
//               <Input.Password
//                 style={{ height: "50px" }}
//                 placeholder="password"
//                 className="w-1/2 border mb-3"
//               />
//             </Form.Item>
//             <div className="buttonlogin">
//               <Button htmlType="submit" disabled={loading}>
//                 {loading ? <Loading /> : "Login"}
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </Containers>
//   );
// };

// export default Login;
