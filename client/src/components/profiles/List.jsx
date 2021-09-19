import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";

import { getAllProfiles } from "../../store/reducers/profile";

const Profiles = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { profiles, count } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllProfiles({ page }));

  }, [dispatch, getAllProfiles, page]);

  const handleChange = (value) => {
    setPage(value);
  };

  console.log("criteria", count);
  const renderSkill = (skills) => {
    return skills.map((item, index) => {
      return (
        <Fragment key={index}>
          <li className="text-primary">
            <i className="fas fa-check"></i> {item}
          </li>
        </Fragment>
      );
    });
  };

  const profileItem = profiles.map((item) => {
    return (
      <Fragment key={item?._id}>
        <div className="profile bg-light">
          <img
            className="round-img"
            src={item?.user?.avatar}
            alt=""
          />
          <div>
            <h2>{item?.user?.name}</h2>
            <p>{item?.company}</p>
            <p>{item?.location}</p>
            <Link
              to={`/profile/${item?.user?._id}`}
              href="#"
              className="btn btn-primary"
            >
              View Profile
            </Link>
          </div>
          <ul>{renderSkill(item?.skills)}</ul>
        </div>
      </Fragment>
    );
  });
  return (
    <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">{profileItem}</div>

      {count > 0 && (
        <Pagination
          style={{ justifyContent: "center", display: "flex" }}
          count={count || 0}
          defaultPage={page || 0}
          onChange={(e, value) => handleChange(value)}
        />
      )}
    </Fragment>
  );
};

export default Profiles;
