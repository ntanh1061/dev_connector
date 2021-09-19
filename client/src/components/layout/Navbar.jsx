import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducers/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticate } = useSelector((state) => state.auth);

  const renderLogin = () => {
    if (!isAuthenticate) {
      return (
        <Fragment>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <li>
            <Link onClick={() => dispatch(logout())} to="/login">
              Logout
            </Link>
          </li>
        </Fragment>
      );
    }
  };
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>
        {renderLogin()}
      </ul>
    </nav>
  );
};
export default Navbar;
