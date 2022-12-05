import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../img/logo.jpg";
import About from "./About";
import Search from "./Search";

function Header() {
  return (
    <div className="header">
      <Container>
        <Row>
          <Col>
            <a href="/">
              <img src={logo} alt="client Logo" />
            </a>
          </Col>
          <Col>
            <Search />
          </Col>
          <Col>
            <About />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;
