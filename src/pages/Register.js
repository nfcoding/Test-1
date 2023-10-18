import React, { useState } from "react";
import { Button, Card, Form, CardBody, Col, Container, FormGroup, Input, Label, Row, Alert } from "reactstrap";
import { registerApi } from "../services/register";

const Register = () => {
  const [alert, setAlert] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const data = {
      email,
      username,
      password,
    };

    registerApi(data)
      .then((res) => {
        setAlert("Register Success!");
        setEmail("");
        setUsername("");
        setPassword("");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = (e, field) => {
    const data = e.target.value;
    if (field === "email") {
      setEmail(data);
    } else if (field === "password") {
      setPassword(data);
    } else if (field === "username") {
      setUsername(data);
    }
  };

  const goToLogin = () => {
    window.location.href = "/";
  };

  return (
    <Container fluid className="m-0">
      <Row className="vh-100 align-items-center">
        <Col md={6} sm={12} className="vh-100 login-left-side d-flex justify-content-center align-items-center">
          <h1 className="text-white bold">Test BTS.id</h1>
        </Col>
        <Col md={6} sm={12} className="d-flex justify-content-center">
          <Col md={7} sm={12}>
            <h4 className="mb-4">Register Here</h4>

            {alert && (
              <Alert color="primary">
                {alert}
                <a className="alert-link" onClick={() => goToLogin()}>
                  Login
                </a>
              </Alert>
            )}

            <Form onSubmit={(e) => handleRegister(e)}>
              <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                <Label for="username" className="mr-sm-2">
                  Username
                </Label>
                <Input type="text" name="username" required id="username" placeholder="Input username..." onChange={(e) => handleChange(e, "username")} value={username} />
              </FormGroup>
              <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                <Label for="email" className="mr-sm-2">
                  Email
                </Label>
                <Input type="email" name="email" id="email" required placeholder="Input email..." onChange={(e) => handleChange(e, "email")} value={email} />
              </FormGroup>
              <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                <Label for="password" className="mr-sm-2">
                  Password
                </Label>
                <Input type="password" required name="password" id="password" placeholder="Input password..." onChange={(e) => handleChange(e, "password")} value={password} />
              </FormGroup>
              <Button type="submit" color="primary" block className="mt-2">
                Register
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
