import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { deleteEducation } from "../../store/reducers/profile";

const Education = ({ education }) => {
  const dispatch = useDispatch();
  const deleteEducationHandler = (educationId) => {
    dispatch(deleteEducation(educationId));
  };

  const renderRow = education.map((item, index) => {
    return (
      <Fragment key={index}>
        <tr>
          <td>{item.school}</td>
          <td className="hide-sm">{item.degree}</td>
          <td className="hide-sm">{item.description}</td>
          <td className="hide-sm">{`${moment(item.from).format(
            "MM DD YYYY"
          )} - ${moment(item.to).format("MM DD YYYY")}`}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => deleteEducationHandler(item._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      </Fragment>
    );
  });
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Description</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{renderRow}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
