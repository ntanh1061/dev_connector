import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Landing = () => {
  const { isAuthenticate } = useSelector((state) => state.auth);

  if (isAuthenticate) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link className="btn btn-primary" to="/register">
              Sign Up
            </Link>
            <Link className="btn btn-light" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
