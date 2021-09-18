import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [user, setUser] = useState({});

  const loginHandler = (e) => {
    e.preventDefault();

    onLogin(user);
  };

  const onInputBlur = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onBlur={(e) => onInputBlur(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onBlur={(e) => onInputBlur(e)}
            required
          />
        </div>
        <button onClick={(e) => loginHandler(e)} className="btn btn-primary">
          Login
        </button>
      </form>
      <p className="my-1">
        Do not have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
