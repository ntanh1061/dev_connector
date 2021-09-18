import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [user, setUser] = useState({});

  const onInputBlur = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const registerHandler = (e) => {
    e.preventDefault();
    onRegister(user);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => registerHandler(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            onBlur={(e) => onInputBlur(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            onBlur={(e) => onInputBlur(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            required
            onBlur={(e) => onInputBlur(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength="6"
            required
            onBlur={(e) => onInputBlur(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
