import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/auth/AuthContext';
import TextContext from '../contexts/texts/TextContexts';
const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { clearTexts } = useContext(TextContext);
  const onlogout = () => {
    logout();
    clearTexts();
  };

  const authLink = (
    <Fragment>
      <div>
        <h5>
          <Link
            to="/textfiles"
            className="text-white mr-4"
            style={{ textDecoration: 'none' }}
          >
            Texts
          </Link>{' '}
          <a
            href="#"
            onClick={onlogout}
            style={{ textDecoration: 'none' }}
            className="text-white"
          >
            <i className="fas fa-sign-out-alt"></i>{' '}
            <span className="hide-sm">logout</span>
          </a>
        </h5>
      </div>
    </Fragment>
  );

  const guestLink = (
    <h5>
      <Link
        to="/login"
        className="text-dark mr-4"
        style={{ textDecoration: 'none' }}
      >
        Login
      </Link>{' '}
      <Link
        to="/register"
        className="text-dark"
        style={{ textDecoration: 'none' }}
      >
        Register
      </Link>
    </h5>
  );
  return (
    <div className="navbar bg-primary text-secondary">
      <Link to="/" className="text-white" style={{ textDecoration: 'none' }}>
        <h1 className="mx-2">
          <i className="far fa-sticky-note"></i> Save-Texts
        </h1>
      </Link>
      <div className="mx-3"> {isAuthenticated ? authLink : guestLink} </div>
    </div>
  );
};

export default Navbar;
