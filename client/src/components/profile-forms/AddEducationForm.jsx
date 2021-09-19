import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addEducation } from "../../store/reducers/profile";

const AddEducationForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [education, setEducation] = useState({});

  const onInputBlur = (e) => {
    let { name, value } = e.target;

    if (name === "bootcamp") {
      value = e.target.checked;
    }

    setEducation({
      ...education,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addEducation({ education, history }));
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            onBlur={(e) => onInputBlur(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            onBlur={(e) => onInputBlur(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            onBlur={(e) => onInputBlur(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" onBlur={(e) => onInputBlur(e)} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="bootcamp"
              onBlur={(e) => onInputBlur(e)}
            />{" "}
            Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" onBlur={(e) => onInputBlur(e)} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            onBlur={(e) => onInputBlur(e)}
          ></textarea>
        </div>
        <input
          type="submit"
          className="btn btn-primary my-1"
          onClick={(e) => onSubmit(e)}
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

export default AddEducationForm;
