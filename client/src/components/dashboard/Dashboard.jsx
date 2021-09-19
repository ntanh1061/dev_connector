import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import Experience from "./Experience";
import Education from "./Education";
import { getProfile, deleteAccount } from "../../store/reducers/profile";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch, getProfile]);

  const onDeleteAccount = () => {
    dispatch(deleteAccount());
  };

  const renderNoProfile = () => {
    return (
      <Fragment>
        <p>You have not yet setup a profile, please add some info</p>
        <Link className="btn btn-primary my-1" to="/create-profile">
          Create Profile
        </Link>
      </Fragment>
    );
  };

  const renderProfile = () => {
    return (
      <Fragment>
        <div className="dash-buttons">
          <Link to={"/edit-profile"} className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i> Edit Profile
          </Link>
          <Link to={"/add-experience"} className="btn btn-light">
            <i className="fab fa-black-tie text-primary"></i> Add Experience
          </Link>
          <Link to={"/add-education"} className="btn btn-light">
            <i className="fas fa-graduation-cap text-primary"></i> Add Education
          </Link>
        </div>
        {!_.isEmpty(profile.experience) && (
          <Experience experience={profile.experience} />
        )}
        {!_.isEmpty(profile.education) && (
          <Education education={profile.education} />
        )}

        <div className="my-2">
          <button onClick={() => onDeleteAccount()} className="btn btn-danger">
            <i className="fas fa-user-minus"></i>
            Delete My Account
          </button>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome John Doe
      </p>
      {profile ? renderProfile() : renderNoProfile()}
    </Fragment>
  );
};

export default Dashboard;
