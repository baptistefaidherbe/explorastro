import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from 'src/containers/Login';
import PropTypes from 'prop-types';
import MapExploration from 'src/containers/MapExploration';
import Component from 'src/utils/Component';
import Participate from 'src/containers/Participate';
import Create from 'src/containers/Create';
import FormEvent from 'src/containers/FormEvent';
import Chat from 'src/containers/Chat';
import Member from 'src/containers/Member';
import Profile from 'src/containers/Profile';
import ListParticipate from 'src/containers/ListParticipate';
import Register from '../Register';
import ProfileSetting from 'src/containers/ProfileSetting';

const App = ({
  isLogged,
  checkIsLogged,
  wsConnect,
  getUserById,
}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const id = user?.user?.id;

  useEffect(() => {
    checkIsLogged();
  }, []);

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [id]);

  useEffect(() => {
    wsConnect();
  }, [isLogged]);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Component
            Login={Login}
            Children={MapExploration}
            isLogged={isLogged}
          />
        </Route>
        <Route path="/map">
          <Component
            Login={Login}
            Children={MapExploration}
            isLogged={isLogged}
          />
        </Route>
        <Route path="/message">
          <Component Login={Login} Children={Chat} isLogged={isLogged} />
        </Route>
        <Route
          path="/profil/:id"
          render={(prop) => (
            <Component
              Login={Login}
              Children={Profile}
              id={Number(prop.match.params.id)}
              isLogged={isLogged}
            />
          )}
        />
        <Route
          path="/setting/"
          render={(prop) => (
            <Component
              Login={Login}
              Children={ProfileSetting}
              isLogged={isLogged}
            />
          )}
        />
        <Route path="/create">
          <Component Login={Login} Children={Create} isLogged={isLogged} />
        </Route>
        <Route path="/myEventsParticipate">
          <Component
            Login={Login}
            Children={ListParticipate}
            isLogged={isLogged}
          />
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
        <Route path="/member">
          <Component Login={Login} Children={Member} isLogged={isLogged} />
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
  isLogged: PropTypes.bool,
  checkIsLogged: PropTypes.func.isRequired,
  wsConnect: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
};

App.defaultProps = {
  isLogged: false,
};

export default App;
