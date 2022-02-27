import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../contexts/alert/AlertContext';
import AuthContext from '../contexts/auth/AuthContext';

const Login = (props) => {
  const { login, isAuthenticated, error, clearErrors, } =
    useContext(AuthContext);
  const { setAlert, setAlerts } = useContext(AlertContext);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error !== null) {
      setAlert(error, 'danger');
      setTimeout(() => clearErrors(), 5000);
    } else {
      setAlerts([]);
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const { username, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };
  return (
    <div className="container">
      <h1 className="text-center">
        Acccount <span className="text-primary">Login</span>{' '}
      </h1>
      <form onSubmit={onSubmit} className="container" style={resized}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            required
            className="form-control form-control-sm"
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
            className="form-control form-control-sm my-1"
          />
        </div>
        <div className="d-grid col-12 my-2">
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

const resized = {
  width: '50%',
};

export default Login;
