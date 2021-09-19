import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "../routes/PrivateRoute";
import NotFound from "../components/layout/NotFound";
import Alert from "../components/layout/Alert";
import ScreenLanding from "./home/Land";
import ScreenLogin from "./auth/Login";
import ScreenRegister from "./auth/Register";
import ScreenProfileDetail from "./profile/ProfileDetail";
import ScreenProfiles from "./profile/Profiles";
import ScreenDashboard from "./dashboard/Dashboard";
import ScreenProfileForm from "./profile-forms/ProfileForm";
import ScreenAddEducation from "./profile-forms/AddEducationForm";
import ScreenExperience from "./profile-forms/AddExperienceForm";

const ScreenRoot = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route path="/" exact component={ScreenLanding} />
        <Route path="/login" exact component={ScreenLogin} />
        <Route path="/register" exact component={ScreenRegister} />
        <Route path="/profiles" exact component={ScreenProfiles} />
        <Route path="/profile/:id" exact component={ScreenProfileDetail} />
        <PrivateRoute path="/dashboard" component={ScreenDashboard} />
        <PrivateRoute
          path="/create-profile"
          exact
          component={ScreenProfileForm}
        />
        <PrivateRoute
          path="/edit-profile"
          exact
          component={ScreenProfileForm}
        />
        <PrivateRoute
          path="/add-education"
          component={ScreenAddEducation}
          exact
        />
        <PrivateRoute
          path="/add-experience"
          component={ScreenExperience}
          exact
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </section>
  );
};

export default ScreenRoot;
