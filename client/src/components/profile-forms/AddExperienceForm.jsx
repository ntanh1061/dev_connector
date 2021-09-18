import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

const AddExperienceForm = ({ addExperienceHandler }) => {
  const history = useHistory();
  const [experience, setExperience] = useState({});

  const onInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "current") {
      value = e.target.checked;
    }

    setExperience({
      ...experience,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    addExperienceHandler(experience);
    history.push("/dashboard");
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              onChange={(e) => onInputChange(e)}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" onChange={(e) => onInputChange(e)} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            onChange={(e) => onInputChange(e)}
          ></textarea>
        </div>
        <input
          type="submit"
          onClick={(e) => onSubmit(e)}
          className="btn btn-primary my-1"
          value="Submit"
        />
        <a
          className="btn btn-light my-1"
          href="#"
          onClick={() => history.goBack()}
        >
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

export default AddExperienceForm;
