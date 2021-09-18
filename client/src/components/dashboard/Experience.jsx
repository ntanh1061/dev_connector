import React, { Fragment } from "react";

import moment from "moment";

const Experience = ({ experience }) => {
  const deleteExperienceHandler = () => {
    //Delete Experience by id
  };

  const renderRow = experience.map((item, index) => {
    return (
      <Fragment key={index}>
        <tr>
          <td>{item.company}</td>
          <td className="hide-sm">{item.title}</td>
          <td className="hide-sm">{item.location}</td>
          <td className="hide-sm">{`${moment(item.from).format('MM DD YYYY')} - ${moment(item.to).format('MM DD YYYY')}`}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => deleteExperienceHandler(item._id)}
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
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderRow}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
