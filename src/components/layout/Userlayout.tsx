import { Outlet, Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Layout, Menu, Button, theme, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./lyout.css";

const { Header, Sider, Content } = Layout;

const Userlayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{ color: "white", padding: "10px 20px", fontSize: "20px" }}
        >
          <NavLink to="#home" className="logo">
            <span>J</span>
            <span>Tulio</span>
          </NavLink>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // selectedKeys={[key]}
          // onClick={({ key }) => {
          //   setKey(key);
          // }}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "/experiences",
              icon: <VideoCameraOutlined />,
              label: <Link to="/experiences">Experiences</Link>,
            },
            {
              key: "/messages",
              icon: <UploadOutlined />,
              label: <Link to="/messages">Messages</Link>,
            },
            {
              key: "/portfolios",
              icon: <UserOutlined />,
              label: <Link to="/portfolios">Portfolio</Link>,
            },
            {
              key: "/skills",
              icon: <UserOutlined />,
              label: <Link to="/skills">Skills</Link>,
            },
            {
              key: "/education",
              icon: <UserOutlined />,
              label: <Link to="/education">Education</Link>,
            },
            {
              key: "/account",
              icon: <UserOutlined />,
              label: <Link to="account">Account</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            className="notification"
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "end",
            }}
          >
            <Link to="/messages" style={{ marginRight: "20px" }}>
              <Avatar
                shape="square"
                size={40}
                icon={<MessageIcon sx={{ fontSize: "25px" }} />}
              />
            </Link>
            <Link
              to="/account"
              style={{ marginRight: "40px", borderRadius: "50px" }}
            >
              <Avatar
                shape="square"
                size={40}
                icon={<AccountCircleIcon sx={{ fontSize: "25px" }} />}
              />
            </Link>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Userlayout;
