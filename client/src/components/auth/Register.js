import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../contexts/alert/AlertContext';
import AuthContext from '../contexts/auth/AuthContext';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert, setAlerts } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    // eslint-disable-next-line
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      setTimeout(() => clearErrors(), 5000);
    } else {
      setAlerts([]);
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    username: '',
    password: '',
    password2: '',
  });
  const { name, username, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setAlerts([]);
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ name, username, password });
      setAlerts([]);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center">
        Acccount <span className="text-primary">Register</span>{' '}
      </h1>
      <form onSubmit={onSubmit} className="container" style={resized}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="5"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="5"
            className="form-control"
          />
        </div>
        <div className="d-grid col-12 my-2">
          <input type="submit" value="Register" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

const resized = {
  width: '50%',
};

export default Register;
