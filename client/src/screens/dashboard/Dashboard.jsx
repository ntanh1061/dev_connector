import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dashboard from "../../components/dashboard/Dashboard";
import { getProfile } from "../../store/reducers/profile";

const ScreenDashboard = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    console.log("reload", profile);
    dispatch(getProfile());
  }, []);
  return <Dashboard  />;
};

export default ScreenDashboard;
