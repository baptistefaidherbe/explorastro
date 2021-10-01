import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from 'src/containers/Login';
import PropTypes from 'prop-types';
import MapExploration from 'src/containers/MapExploration';
import Component from 'src/utils/Component';
import Participate from 'src/containers/Participate';
import Create from 'src/containers/Create';
import FormEvent from 'src/containers/FormEvent';
import Register from '../Register';

const App = ({ isLogged, checkIsLogged, wsConnect }) => {
  useEffect(() => {
    wsConnect();
    checkIsLogged();
  }, []);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Component Login={Login} Children={MapExploration} isLogged={isLogged} />
        </Route>
        <Route path="/map">
          <Component Login={Login} Children={MapExploration} isLogged={isLogged} />
        </Route>
        <Route path="/create">
          <Component Login={Login} Children={Create} isLogged={isLogged} />
        </Route>
        <Route
          path="/formEvent/:id"
          render={(prop) => (
            <Component
              Login={Login}
              Children={FormEvent}
              id={Number(prop.match.params.id)}
              isLogged={isLogged}
            />
          )}
        />
        <Route
          path="/exploration/:id"
          render={(prop) => (
            <Component
              Login={Login}
              Children={Participate}
              id={Number(prop.match.params.id)}
              isLogged={isLogged}
            />
          )}
        />
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
  isLogged: PropTypes.bool,
  checkIsLogged: PropTypes.func.isRequired,
  wsConnect: PropTypes.func.isRequired,
};

App.defaultProps = {
  isLogged: false,
};

export default App;
