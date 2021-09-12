import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alert = useSelector((state) => state.alert);

  const renderAlert = alert.map((item, index) => {
    return (
      <div key={index} id={item.id} className={`alert alert-${item.type}`}>
        {item.message}
      </div>
    );
  });
  return <Fragment>{renderAlert}</Fragment>;
};

export default Alert;
