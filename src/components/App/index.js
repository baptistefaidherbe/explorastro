import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from 'src/containers/Login';
import PropTypes from 'prop-types';
import Participate from 'src/containers/Participate';
import Component from 'src/utils/Component';
import Register from '../Register';

const App = ({ isLogged, checkIsLogged }) => {
  useEffect(() => {
    checkIsLogged();
  }, []);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Component Login={Login} Children={Participate} isLogged={isLogged} />
        </Route>
        <Route path="/participate">
          <Component Login={Login} Children={Participate} isLogged={isLogged} />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          {isLogged ? <Redirect to="/" /> : <Login />}
        </Route>
      </Switch>
    </div>
  );
};

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  checkIsLogged: PropTypes.func.isRequired,
};

export default App;
