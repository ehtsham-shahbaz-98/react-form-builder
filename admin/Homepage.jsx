import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Homepage.css";

import sponsors from "../../assets/admin/sponsors.png";
import studies from "../../assets/admin/studies.png";
import users from "../../assets/admin/users.png";

const Homepage = () => {
  return (
    <>
      <div className="content-body">
        <p className="admin-link">Home</p>
        <p className="admin-heading">Admin Panel</p>
        <div className="card-container">
          <Row>
            <Col md={4} sm={12}>
              <div className="admin-card">
                <div className="img-body">
                  <img
                    className="card-img"
                    src={sponsors}
                    alt="Sponsors Image"
                  />
                </div>

                <div className="heading-body">
                  <p className="card-heading">Sponsors</p>
                </div>

                <div className="card-buttons">
                  <Row>
                    <Col md={6} sm={6}>
                      <button className="cardBtn">Manage</button>
                    </Col>
                    <Col md={6} sm={6}>
                      <button className="cardBtn">View</button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={4} sm={12}>
              <div className="admin-card">
                <div className="img-body">
                  <img
                    className="card-img"
                    src={studies}
                    alt="Sponsors Image"
                  />
                </div>

                <div className="heading-body">
                  <p className="card-heading">Studies</p>
                </div>

                <div className="card-buttons">
                  <Row>
                    <Col md={6} sm={6}>
                      <button className="cardBtn">Manage</button>
                    </Col>
                    <Col md={6} sm={6}>
                      <button className="cardBtn">View</button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={4} sm={12}>
              <div className="admin-card">
                <div className="img-body">
                  <img className="card-img" src={users} alt="Sponsors Image" />
                </div>

                <div className="heading-body">
                  <p className="card-heading">Users</p>
                </div>

                <div className="card-buttons">
                  <Row>
                    <Col md={6} sm={6}>
                      <button className="cardBtn">Manage</button>
                    </Col>
                    <Col md={6} sm={6}>
                      <button className="cardBtn">View</button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Homepage;
