import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Profile from "../../components/profiles/ProfileDetail";
import { getProfile } from "../../store/reducers/profile";

const ScreenProfileDetail = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  });

  console.log("-------", profile)
  return <Profile />;
};

export default ScreenProfileDetail;
