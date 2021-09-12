import React from "react";
import { Route, Switch } from "react-router-dom";

import Alert from "../components/layout/Alert";
import ScreenLanding from "../screens/home/Land";
import ScreenLogin from "../screens/auth/Login";
import ScreenRegister from "../screens/auth/Register";
import ScreenProfileDetail from "../screens/profile/ProfileDetail";
import ScreenProfiles from "../screens/profile/Profiles";
import ScreenDashboard from "../screens/dashboard/Dashboard";
import NotFound from "../components/layout/NotFound";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route path="/" exact component={ScreenLanding} />
        <Route path="/login" exact component={ScreenLogin} />
        <Route path="/register" exact component={ScreenRegister} />
        <Route path="/profiles" exact component={ScreenProfiles} />
        <Route path="/profile:id" exact component={ScreenProfileDetail} />
        <PrivateRoute path="/dashboard" component={ScreenDashboard} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
