import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getProfileById } from "../../store/reducers/profile";

const ProfileDetail = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const params = useParams();

  useEffect(() => {
    dispatch(getProfileById(params.id));
  }, [dispatch, getProfileById]);

  const renderSkill = (skills) => {
    return skills.map((item, index) => {
      return (
        <div key={index} className="p-1">
          <i className="fa fa-check"></i> {item}
        </div>
      );
    });
  };

  const renderExperience = (exps) => {
    return exps.map((item, index) => {
      return (
        <Fragment key={index}>
          <div>
            <h3 className="text-dark">{item?.company}</h3>
            <p>{`${moment(item?.from).format("MMM Do YY")} - ${moment(
              item?.to
            ).format("MMM Do YY")}`}</p>
            <p>
              <strong>Position: </strong>
              {item?.title}
            </p>
            <p>
              <strong>Description: </strong>
              {item?.description}
            </p>
          </div>
        </Fragment>
      );
    });
  };

  const renderEducation = (educations) => {
    return educations.map((item, index) => {
      return (
        <Fragment key={index}>
          <div>
            <h3>{item?.school}</h3>
            <p>{`${moment(item?.from).format("MMM Do YY")} - ${moment(
              item?.to
            ).format("MMM Do YY")}`}</p>
            <p>
              <strong>Degree: </strong>
              {item?.degree}
            </p>
            <p>
              <strong>Field Of Study: </strong>
              {item?.fieldofstudy}
            </p>
            <p>
              <strong>Description: </strong>
              {item?.description}
            </p>
          </div>
        </Fragment>
      );
    });
  };
  return (
    <Fragment>
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>

      <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
          <img className="round-img my-1" src={profile?.user?.avatar} alt="" />
          <h1 className="large">{profile?.user?.name}</h1>
          <p className="lead">{profile?.company}</p>
          <p>{profile?.location}</p>
          <div className="icons my-1">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{`${profile?.user?.name} Bio`}</h2>
          <p>{profile?.bio}</p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">{renderSkill(profile?.skills || [])}</div>
        </div>

        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {renderExperience(profile?.experience || [])}
        </div>

        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {renderEducation(profile?.education || [])}
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileDetail;
