import type { NextPage } from "next";
import { Card, Form, Input, Button, Checkbox } from "antd";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/login.module.css";
import { User } from "../utils/types";
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
  const [loginOrRegisterForm] = Form.useForm();

  const createNewUser = async (params: User) => {
    await fetch("http://localhost:3000/api/user/login", {
      method: "post",
      body: JSON.stringify(params),
    });
  };

  const checkUser = async (params: User) => {
    await fetch("http://localhost:3000/api/user/authoritarian", {
      method: "post",
      body: JSON.stringify(params),
    });
  };

  const onFinish = (values: any) => {
    const params = loginOrRegisterForm.getFieldsValue();
    if (isRegister) return createNewUser(params);
    return checkUser(params);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles["login-main-content"]}>
      <Card>
        <div className={styles["login-card-content"]}>
          <div className={styles["login-card-info"]}>
            {isRegister ? (
              <>
                <div className={styles["login-card-info-logo"]}>
                  <Image src={devchallengesSvg} alt="devchallenges" />
                </div>
                <p className={styles["login-card-info-title"]}>
                  Join thousands of learners from around the world
                </p>
                <p className={styles["login-card-info-tips"]}>
                  Master web development by making real-life projects. There are
                  multiple paths for you to choose
                </p>
              </>
            ) : (
              <p className={styles["login-card-info-title"]}>Login</p>
            )}
          </div>

          <div className={styles["login-card-register-form"]}>
            <Form
              name="loginOrRegisterForm"
              form={loginOrRegisterForm}
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
                  placeholder="Email"
                  prefix={<MailFilled className={styles["login-form-icon"]} />}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  prefix={<LockFilled className={styles["login-form-icon"]} />}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles["login-form-button"]}
                >
                  {isRegister ? "Start coding now" : "Login"}
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className={styles["login-with-platform"]}>
            <p>or continue with these social profile</p>
            <div className={styles["login-with-platform-logo-wrapper"]}>
              <GoogleOutlined className={styles["login-with-platform-logo"]} />
              <FacebookOutlined
                className={styles["login-with-platform-logo"]}
              />
              <TwitterOutlined className={styles["login-with-platform-logo"]} />
              <GithubOutlined className={styles["login-with-platform-logo"]} />
            </div>

            {isRegister ? (
              <p>
                Adready a member?
                <span
                  className={styles["login-jump-to-component"]}
                  onClick={() => setIsRegister(false)}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don???t have an account yet?
                <span
                  className={styles["login-jump-to-component"]}
                  onClick={() => setIsRegister(true)}
                >
                  Register
                </span>
              </p>
            )}
          </div>
        </div>
      </Card>
      <div className={styles["login-creator-info"]}>
        <p>created by verafoo</p>
        <p>devChallenges.io</p>
      </div>
    </div>
  );
};

export default Login;
