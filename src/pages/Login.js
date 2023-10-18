import React, { useEffect, useState } from "react";
import { Button, Card, Form, CardBody, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/loginSlice";
import { loginApi } from "../services/login";

import Cookie from "universal-cookie";
import { redirect } from "react-router-dom";
const Login = () => {
  const cookie = new Cookie();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    loginApi(data).then((res) => {
      dispatch(login(true));
      cookie.set("token", res.data.data.token);

      window.location.href = "/checklist";
    });
  };

  useEffect(() => {
    if (cookie.get("token")) {
      window.location.href = "/checklist";
    }
  }, []);

  const handleChange = (e, field) => {
    const data = e.target.value;
    if (field === "username") {
      setUsername(data);
    } else if (field === "password") {
      setPassword(data);
    }
  };

  const handleRegister = () => {
    window.location.href = "/register";
  };

  return (
    <Container fluid className="m-0">
      <Row className="vh-100 align-items-center">
        <Col md={6} sm={12} className="vh-100 login-left-side d-flex justify-content-center align-items-center">
          <h1 className="text-white bold">Test BTS.id</h1>
        </Col>
        <Col md={6} sm={12} className="d-flex justify-content-center">
          <Col md={7} sm={12}>
            <h4 className="mb-4">Welcome</h4>
            <Form onSubmit={(e) => handleLogin(e)}>
              <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                <Label for="username" className="mr-sm-2">
                  Username
                </Label>
                <Input type="text" name="username" id="username" placeholder="Input username" onChange={(e) => handleChange(e, "username")} required />
              </FormGroup>
              <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2">
                  Password
                </Label>
                <Input type="password" name="password" id="examplePassword" placeholder="Input password!" onChange={(e) => handleChange(e, "password")} required />
              </FormGroup>

              <Button color="none" className="btn-primary btn-sm btn-link" onClick={() => handleRegister()}>
                <small>Dont have account ? Register Here</small>
              </Button>

              <Button type="submit" color="primary" block className="mt-2">
                Login
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
