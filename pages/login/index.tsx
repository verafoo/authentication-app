import type { NextPage } from "next";
import { Card, Form, Input, Button, Checkbox } from "antd";
import Image from "next/image";
import { useState } from "react";
import {
  UserOutlined,
  MailOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";
const devchallengesSvg = require("../../public/devchallenges.svg");

const Login: NextPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Card style={{ width: 300 }}>
        <div className="info">
          {isRegister ? (
            <>
              <Image src={devchallengesSvg} alt="devchallenges" />
              <p>Join thousands of learners from around the world</p>
              <p>
                Master web development by making real-life projects. There are
                multiple paths for you to choose
              </p>
            </>
          ) : (
            <p>Login</p>
          )}
        </div>

        <div className="register-form">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="email"
                prefix={<MailOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="password"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                {isRegister ? "Start coding now" : "Login"}
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="login">
          <p>or continue with these social profile</p>
          <div className="circle-icon">
            <GoogleOutlined />
          </div>
          <div className="circle-icon">
            <FacebookOutlined />
          </div>
          <div className="circle-icon">
            <TwitterOutlined />
          </div>
          <div className="circle-icon">
            <GithubOutlined />
          </div>

          {isRegister ? (
            <p>
              Adready a member? <a href="#">Login</a>
            </p>
          ) : (
            <p>
              Don’t have an account yet? <a href="#">Register</a>
            </p>
          )}
        </div>
      </Card>
      <div className="creator-info">
        <p>created by verafoo</p>
        <p>devChallenges.io</p>
      </div>
    </>
  );
};

export default Login;
