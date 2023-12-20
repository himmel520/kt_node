import React from "react";
import { Modal, Button } from "react-bootstrap";

const Users = ({ show, onHide, users }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title variant="secondary">Users List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {users.map((user) => (
          <div key={user.name}>
            <svg
              className="user-color"
              width="16"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill={user.color} />
            </svg>
            &nbsp;
            {user.name}
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Users;
