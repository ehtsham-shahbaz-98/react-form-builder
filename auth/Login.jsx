import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useTheme } from "@mui/material/styles";

import logo from "../../assets/images/icon.png";

const Login = () => {
  const theme = useTheme();

  return (
    <Container style={{ padding: "3%" }}>
      <div className="authContainer">
        <img className="logo-img" src={logo} alt="Genesis Logo" />
        <h1 className="logo-text">Genesis</h1>
      </div>
      <Row className="justify-content-center">
        <Col sm={12} md={8} lg={8} xl={8}>
          <div className="customCard">
            <h2 className="text-center" style={{ paddingBottom: "3rem" }}>
              Login
            </h2>
            <div className="form-body">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    height: "auto",
                    width: "100%",
                    borderRadius: "10px",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div className="emailDiv">
                  <TextField
                    required
                    id="outlined-email"
                    label="Email"
                    placeholder="Enter your email"
                    className="w-100 email-container"
                    variant="outlined"
                    size="large"
                    InputLabelProps={{
                      style: {
                        fontSize: "17px",
                        fontWeight: "500",
                        color: "#1F1F1F",
                      },
                    }}
                    inputProps={{
                      style: {
                        fontSize: "13px",
                        fontWeight: "500",
                      },
                    }}
                  />
                </div>
                <div className="passwordDiv">
                  <TextField
                    required
                    id="outlined-password"
                    label="Password"
                    placeholder="Enter your password"
                    className="w-100 password-container"
                    InputLabelProps={{
                      style: {
                        fontSize: "17px",
                        fontWeight: "500",
                        color: "#1F1F1F",
                      },
                    }}
                    inputProps={{
                      style: {
                        fontSize: "13px",
                        fontWeight: "500",
                      },
                    }}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  {" "}
                  <p
                    style={{
                      color: "#717177",
                      fontSize: "12px",
                      textAlign: "center",
                      marginTop: "5px",
                      borderBottom: "2px solid #717177",
                      display: "inlineBlock",
                      marginBottom: "4rem",
                    }}
                  >
                    Forgot Password?
                  </p>
                </div>{" "}
                <div className="d-flex justify-content-center">
                  {" "}
                  <button type="button" className="loginButton">
                    Login
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  {" "}
                  <p
                    style={{
                      color: "#717177",
                      fontSize: "12px",
                      textAlign: "center",
                      marginTop: "5px",
                      borderBottom: "2px solid #717177",
                      display: "inlineBlock",
                      marginBottom: "5rem",
                    }}
                  >
                    Privacy policy
                  </p>
                </div>
              </Box>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
