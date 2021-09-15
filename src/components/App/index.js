import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../Header";
import Register from "../Register";
import Login from "../Login";

const App = () => {
  useEffect(() => {}, []);

  return (
    <div className="app">
      <Route exact path="/">
        <Header /> : <Register />
      </Route>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      <Route path="/register">
        <Register />
      </Route>
    </div>
  );
};

export default App;
