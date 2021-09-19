import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import SocialNetwork from "./SocialNetwork";
import { addProfile } from "../../store/reducers/profile";

const CreateProfile = () => {
  const initFormData = {
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
    githubUsername: "",
    about: "",
    twitter: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    instagram: "",
  };
  const [formData, setFormData] = useState(initFormData);
  const [isAddSocial, setIsAddSocial] = useState(false);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const history = useHistory();
  const creatingProfile = useRouteMatch("/create-profile");

  useEffect(() => {
    if (!creatingProfile) {
      const profileData = { ...initFormData };

      for (const key in profile) {
        if (key in profileData) {
          profileData[key] = profile[key];
        }
      }

      for (const key in profile.social) {
        if (key in profileData) {
          profileData[key] = profile.social[key];
        }
      }

      if (Array.isArray(profileData.skills)) {
        profileData.skills = profileData.skills.join(", ").trim();
      }

      setFormData(profileData);
    }
  }, []);

  const toggleSocialNetwork = () => {
    setIsAddSocial(!isAddSocial);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addProfile({ profile: formData, history }));
  };
  return (
    <Fragment>
      <h1 className="large text-primary">
        {creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i>{" "}
        {creatingProfile
          ? ` Let's get some information to make your`
          : " Add some changes to your profile"}
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select
            value={formData.status}
            name="status"
            required
            onChange={(e) => onInputChange(e)}
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            {"Give us an idea of where you are at in your career"}
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            name="company"
            onChange={(e) => onInputChange(e)}
          />
          <small className="form-text">
            {"Could be your own company or one you work for"}
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            value={formData.website}
            name="website"
            onChange={(e) => onInputChange(e)}
          />
          <small className="form-text">
            {"Could be your own or a company website"}
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            name="location"
            onChange={(e) => onInputChange(e)}
          />
          <small className="form-text">
            {"City & state suggested (eg. Boston, MA)"}
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            value={formData.skills}
            name="skills"
            required
            onChange={(e) => onInputChange(e)}
          />
          <small className="form-text">
            {"Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"}
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            value={formData.githubUsername}
            name="githubUsername"
            onChange={(e) => onInputChange(e)}
          />
          <small className="form-text">
            {
              "If you want your latest repos and a Github link, include your username"
            }
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            value={formData.about}
            name="about"
            onChange={(e) => onInputChange(e)}
          ></textarea>
          <small className="form-text">
            {"Tell us a little about yourself"}
          </small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialNetwork()}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {isAddSocial && (
          <SocialNetwork
            onInputChange={(e) => onInputChange(e)}
            formData={formData}
          />
        )}
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
        <button className="btn btn-light my-1" onClick={() => history.goBack()}>
          Go Back
        </button>
      </form>
    </Fragment>
  );
};

export default CreateProfile;
