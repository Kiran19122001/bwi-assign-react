import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";

import "./index.css";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";

const Navigation = () => {
  const navigate = useNavigate();
  const count = useSelector((state) => state.cart.items.length);
  const [expanded, setExpanded] = useState(false);

  const onLogout = () => {
    console.log("onlogout");
    Cookies.remove("token");
    navigate("/login");
  };

  const handleNavClose = () => {
    setExpanded(false);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary nav-main-cont">
      <Container className="container-parent">
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center"
          onClick={handleNavClose}
        >
          {/* <GiFoodTruck className="mr-2 logo" size={70} color="orange" /> */}
          <span className="logo-name">Storezone</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="navigation-items"
          in={expanded}
        >
          <Nav className="me-auto mobile-view-menu">
            <Nav.Link
              as={Link}
              to="/"
              className="bars"
              onClick={handleNavClose}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cart"
              className="bars"
              onClick={handleNavClose}
            >
              Cart
              <span className="count-nav">{count}</span>
            </Nav.Link>
            <Button onClick={onLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
