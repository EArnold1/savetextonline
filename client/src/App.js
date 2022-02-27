import React, { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Textfiles from './components/pages/Textfiles';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import TextState from './components/contexts/texts/TextState';
import AuthState from './components/contexts/auth/AuthState';
import AlertState from './components/contexts/alert/AlertState';
import Alert from './components/layout/Alert';
import PrivateRoute from './routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import AuthContext from './components/contexts/auth/AuthContext';

if (localStorage.apiToken) {
  console.log(localStorage.apiToken)
  setAuthToken(localStorage.apiToken);
}

const App = () => {
  return (
    <AuthState>
      <TextState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute exact path="/textfiles" component={Textfiles} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </TextState>
    </AuthState>
  );
};

export default App;
