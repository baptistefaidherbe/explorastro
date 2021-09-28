/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";

const Participant = ({ username }) => (
  <div className="card">
    <span>{username}</span>
  </div>
);

Participant.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Participant;
