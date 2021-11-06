import type { NextPage } from "next";
import { Card, Form, Input, Button, Checkbox } from "antd";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/login.module.css";
import {
  MailFilled,
  LockFilled,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";
const devchallengesSvg = require("../../public/devchallenges.svg");

const Login: NextPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles["login-main-content"]}>
      <Card className={styles["login-card"]}>
        <div className={styles["login-card-content"]}>
          <div className={styles["login-card-info"]}>
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

          <div className={styles["login-card-register-form"]}>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  placeholder="email"
                  prefix={<MailFilled className="site-form-item-icon" />}
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
                  prefix={<LockFilled className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item>
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
        </div>
      </Card>
      <div className="login-creator-info">
        <p>
          <span>created by verafoo</span>
          <span>devChallenges.io</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
