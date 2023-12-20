import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const Main = () => {
  const [name, setName] = useState("");
  const [chatName, setChatName] = useState("");
  const [color, setColor] = useState("#808B96");

  const handleJoinChat = () => {
    console.log({
      name: name,
      chat: chatName,
      color: color,
    });
  };

  const isFormValid = name !== "" && chatName !== "";

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 mx-3">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        height="70%"
        fill="#808B96"
        className="bi bi-circle-fill position-absolute top-50 start-50 translate-middle"
        viewBox="0 0 16 16"
      >
        <circle cx="8" cy="8" r="8" />
      </svg>
      <Container fluid className="" style={{zIndex: 1}}>
        <h1 className="text-center text-light mb-3">Join</h1>
        <Row className="">
          <Col xs={12} md={4} lg={4}></Col>
          <Col xs={12} md={4} lg={4}className="rounded p-4 bg-light">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                aria-label="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Chat name"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex align-items-center">
              <Form.Label htmlFor="ColorInput" className="me-3 mb-0">
                <p className="text-dark mb-1">Choose your color:</p>
              </Form.Label>
              <Form.Control
                type="color"
                id="ColorInput"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4} lg={4}></Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <Link
              className="btn btn-outline-light"
              onClick={handleJoinChat}
              to={
                isFormValid
                  ? `/chat?name=${name}&room=${chatName}&color=${encodeURIComponent(color)}`
                  : "#"
              }
            >
              Join Chat
            </Link>{" "}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
