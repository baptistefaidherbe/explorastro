import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from 'src/containers/Login';
import PropTypes from 'prop-types';
import Header from '../Header';
import Register from '../Register';

const App = ({ isLogged, checkIsLogged }) => {
  useEffect(() => {
    checkIsLogged();
  }, []);

  return (
    <div className="app">
      <Route exact path="/">
        {isLogged ? <Header /> : <Login />}
      </Route>
      <Switch>
        <Route path="/login">
          {isLogged ? <Redirect to="/" /> : <Login />}
        </Route>
      </Switch>
      <Route path="/register">
        <Register />
      </Route>
    </div>
  );
};

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  checkIsLogged: PropTypes.func.isRequired,
};

export default App;
