import React, { Fragment } from "react";

const SocialNetwork = ({ onInputChange, formData }) => {
  return (
    <Fragment>
      <div className="form-group social-input">
        <i className="fab fa-twitter fa-2x"></i>
        <input
          type="text"
          placeholder="Twitter URL"
          name="twitter"
          value={formData.twitter || ""}
          onChange={(e) => onInputChange(e)}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-facebook fa-2x"></i>
        <input
          type="text"
          placeholder="Facebook URL"
          name="facebook"
          value={formData.facebook || ""}
          onChange={(e) => onInputChange(e)}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-youtube fa-2x"></i>
        <input
          type="text"
          placeholder="YouTube URL"
          name="youtube"
          value={formData.youtube || ""}
          onChange={(e) => onInputChange(e)}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-linkedin fa-2x"></i>
        <input
          type="text"
          placeholder="Linkedin URL"
          name="linkedin"
          value={formData.linkedin || ""}
          onChange={(e) => onInputChange(e)}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-instagram fa-2x"></i>
        <input
          type="text"
          placeholder="Instagram URL"
          name="instagram"
          value={formData.instagram || ""}
          onChange={(e) => onInputChange(e)}
        />
      </div>
    </Fragment>
  );
};

export default SocialNetwork;
