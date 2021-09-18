import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import ProfileForm from "../../components/profile-forms/ProfileForm";
import { addProfile } from "../../store/reducers/profile";

const ScreenCreateProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const history = useHistory();
  const creatingProfile = useRouteMatch("create-profile");

  const onAddProfile = async (profile) => {
    await dispatch(addProfile(profile));

    history.push("/dashboard");
  };

  return (
    <ProfileForm
      onAddProfile={(profile) => onAddProfile(profile)}
      profile={profile}
      creatingProfile={creatingProfile}
    />
  );
};

export default ScreenCreateProfile;
