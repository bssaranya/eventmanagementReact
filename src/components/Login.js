import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginData } from '../actions';

const Login = ({ handleClose, show }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const formSubmit = (e) => {
    //  data for submit
    e.preventDefault();
    dispatch(loginData({ userName, password }));
    handleClose();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="sm"
      >
        <Modal.Body className="text-center m-3">
          <Modal.Title>Login</Modal.Title>
          <form onSubmit={formSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button variant="success" type="submit">
              Submit
            </Button>
            <Link
              variant="secondary"
              onClick={handleClose}
              className="mx-3 text-decoration-none btn btn-secondary"
              to="/"
            >
              Close
            </Link>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
