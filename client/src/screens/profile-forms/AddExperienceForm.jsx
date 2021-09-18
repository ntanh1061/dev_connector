import React from "react";
import { useDispatch } from "react-redux";

import AddExperienceForm from "../../components/profile-forms/AddExperienceForm";
import { addExperience } from "../../store/reducers/profile";

const ScreenAddEducation = () => {
  const dispatch = useDispatch();

  const addExperienceHandler = (experience) => {
    dispatch(addExperience(experience));
  };
  return (
    <AddExperienceForm
      addExperienceHandler={(experience) => addExperienceHandler(experience)}
    />
  );
};

export default ScreenAddEducation;
