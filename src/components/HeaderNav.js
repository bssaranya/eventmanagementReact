import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Event from './admin/Event';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Login from './Login';
import { logout } from '../actions';

const Navbar = styled.div`
  height: 60px;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 10, 1) 0%,
    rgba(85, 57, 24, 1) 41%
  );

  /* background: linear-gradient(
    90deg,
    rgba(40, 21, 94, 0.9640231092436975) 0%,
    rgba(86, 5, 167, 0.9668242296918768) 36%
  ); */
`;
const Heading = styled.div`
  margin-left: 10%;
`;
const LinkItem = styled.div`
  margin-left: 8%;
`;

const Signin = styled.div`
  margin-left: 10%;
`;

const HeaderNav = () => {
  const [show, setShow] = useState(false);

  const { islogin } = useSelector((state) => state.oauthReducer);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar className="d-flex w-100 flex-wrap">
        <Heading className="w-25 mt-3">
          <h4 className="text-white">Event Mangement</h4>
        </Heading>
        <LinkItem className="w-25 mt-3">
          {!islogin ? (
            <>
              <Link to="/" className="text-decoration-none ms-5 text-white">
                Home
              </Link>
              <Link
                to="/about"
                className="text-decoration-none ms-5 text-white"
              >
                About
              </Link>
              <Link
                to="/userevent"
                className="text-decoration-none ms-5 text-white"
              >
                Event
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-decoration-none ms-5 text-white"
              >
                Dashboard
              </Link>
              <Link
                to="/events"
                className="text-decoration-none ms-5 text-white"
              >
                Event
              </Link>
              <Link
                to="/organisation"
                className="text-decoration-none ms-5 text-white"
              >
                Organisation
              </Link>
            </>
          )}
        </LinkItem>
        <Signin className="mt-3">
          {!islogin ? (
            <Link
              to="/login"
              className="text-decoration-none ms-5 text-white"
              onClick={handleShow}
              style={{ cursor: 'pointer' }}
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/change-pswd"
                className=" text-decoration-none text-white"
              >
                Change Password
              </Link>
              <Link
                to="/"
                className="text-decoration-none ms-3 text-white"
                onClick={() => dispatch(logout())}
                style={{ cursor: 'pointer' }}
              >
                Logout
              </Link>
            </>
          )}
        </Signin>
        <Login handleClose={handleClose} show={show} />
      </Navbar>
    </>
  );
};

export default HeaderNav;
