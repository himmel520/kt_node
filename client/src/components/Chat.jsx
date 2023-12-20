import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";

import { Navbar, Nav, Button } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
import { InputGroup, Form } from "react-bootstrap";

import icon from "../image/cat.svg";
import Messages from "./Messages";
import Users from "./Users";

const socket = io.connect("http://localhost:3001");

const Chat = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState({ room: "", name: "", color: "" });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);
  const [chatUsers, setChatUsers] = useState([]);
  const [showUsersModal, setShowUsersModal] = useState(false);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));

    if (searchParams.color) {
      searchParams.color = decodeURIComponent(searchParams.color);
    }

    setParams(searchParams);

    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((prevState) => [...prevState, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("room", ({ data: { users } }) => {
      console.log(users)
      setChatUsers(users);
      setUsers(users.length);
    });
  }, []);

  const leftRoom = () => {
    socket.emit("leftRoom", { params });
    navigate("/");
  };

  const handleChange = ({ target: { value } }) => setMessage(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("sendMessage", { message, params });

    setMessage("");
  };

  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

  const handleShowUsers = () => {
    setShowUsersModal(true);
  };

  return (
    <div style={{ background: "#808B96", minHeight: "100vh" }}>
      <Navbar expand="sm" style={{ background: "#566573" }}>
        <Container>
          <Navbar.Brand className="text-light">{params.room}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Navbar.Text className="text-light">
                <span
                  className="text-link"
                  onClick={handleShowUsers}
                >
                  users {users}
                </span>
              </Navbar.Text>
            </Nav>
            <Nav>
              <Button variant="danger" size="md" onClick={leftRoom}>
                Leave
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Users
        show={showUsersModal}
        onHide={() => setShowUsersModal(false)}
        users={chatUsers}
      />
      <Container fluid className="">
        <Row>
          <Col></Col>
          <Col
            xs={12}
            md={8}
            lg={7}
            className="messages-container p-3 min-vh-100"
            style={{ background: "#EBEDEF", borderRadius: "8px" }}
          >
            <Messages messages={state} name={params.name} />
          </Col>
          <Col></Col>
        </Row>

        <Row className="align-items-center fixed-bottom m-1">
          <Col xs={12} md={2} lg={3}></Col>
          <Col xs={12} md={8} lg={6}>
            <InputGroup className="w-100">
              <Form.Control
                type="text"
                name="message"
                placeholder="Message"
                value={message}
                onChange={handleChange}
                autoComplete="off"
                required
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <InputGroup.Text style={{ position: "relative" }}>
                <img
                  src={icon}
                  alt=""
                  width="20"
                  height="20"
                  onClick={() => setOpen(!isOpen)}
                  style={{ cursor: "pointer" }}
                />
                {isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "100%",
                      left: 0,
                      zIndex: 1000,
                    }}
                  >
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </InputGroup.Text>
              <Button variant="primary" onClick={handleSubmit}>
                Send
              </Button>
            </InputGroup>
          </Col>
          <Col xs={12} md={2} lg={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Chat;
