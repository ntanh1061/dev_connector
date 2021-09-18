import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import AddEducationForm from "../../components/profile-forms/AddEducationForm";
import { addEducation } from "../../store/reducers/profile";

const ScreenAddEducation = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const addEducationHandler = (eduction) => {
    dispatch(addEducation(eduction, history));
  };
  return (
    <AddEducationForm
      addEducationHandler={(eduction) => addEducationHandler(eduction)}
    />
  );
};

export default ScreenAddEducation;
