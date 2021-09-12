import React, { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAlert } from "../../store/reducers/alert-reducer";
import { register } from "../../store/reducers/auth";

const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticate } = useSelector((state) => state.auth);
  const history = useHistory();

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  useEffect(() => {
    if (isAuthenticate) {
      history.push("/dashboard");
    }
  }, [isAuthenticate]);
  
  const registerHandler = (e) => {
    e.preventDefault();

    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;
    const user = {
      name,
      email,
      password,
    };

    if (password !== confirmPassword) {
      dispatch(
        setAlert({
          message: "Password not Match",
          type: "danger",
        })
      );
    } else {
      dispatch(register(user));
    }
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
            ref={nameInputRef}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            ref={emailInputRef}
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
            ref={passwordInputRef}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength="6"
            required
            ref={confirmPasswordInputRef}
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
