import React, { Suspense } from "react";
import "./styles.css";
import { history } from "./utils/history";
import { Router, Route, Switch } from "react-router-dom";
import Components from "./components";

const routePaths = {
  login: "/",
  home: "/home",
  userCreate: "/create"
};

export default function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Components.Login} />
            <Route
              exact
              path={routePaths.home}
              component={Components.Home}
            />
            <Route
              exact
              path={routePaths.userCreate}
              component={Components.UserCreate}
            />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}
