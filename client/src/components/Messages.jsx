import React from "react";
import { Row, Col, Alert } from "react-bootstrap";

const Messages = ({ messages, name }) => {
  return (
    <div>
      {messages.map(({ user, message }, i) => {
        const userName = user && user.name ? user.name : "";
        const itsMe =
          userName.trim().toLowerCase() === name.trim().toLowerCase();
        return (
          <Row
            key={i}
            className={
              itsMe
                ? "justify-content-end"
                : userName === "admin"
                ? "justify-content-center"
                : "justify-content-start"
            }
          >
            <Col xs={6}>
              {userName === "admin" ? (
                <p className="text-center">{message}</p>
              ) : (
                <>
                  <p className="mb-0" style={{ color: user.color }}>
                    {userName}
                  </p>
                  <Alert
                    variant="dark"
                    className={`p-2 ${itsMe ? "text-right" : "text-left"}`}
                    style={{ wordWrap: "break-word" }}
                  >
                    {message}
                  </Alert>
                </>
              )}
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default Messages;
