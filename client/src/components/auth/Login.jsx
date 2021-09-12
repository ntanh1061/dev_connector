import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const loginHandler = (e) => {
    e.preventDefault();

    props.onLogin({
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    });
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={(e) => loginHandler(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            ref={emailInputRef}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Do not have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
