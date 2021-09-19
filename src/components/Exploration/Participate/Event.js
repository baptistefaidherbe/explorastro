/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";
import explorationImg from "src/assets/img/bg_sky2.png";

const Event = ({ exploration }) => (
  <div className="card">
    <h2>{exploration.name}</h2>
    <img src={explorationImg} alt="explorationImg" className="img" />
    <div className="description">{exploration.description}</div>
    <div className="author"><span>Organisateur : </span>{exploration.username}</div>
    <div className="date"><span>Date de l'exploration : </span>{exploration.date}</div>
    <button className="button">Participer</button>
  </div>
);

Event.propTypes = {
  exploration: PropTypes.object.isRequired,
};

export default Event;
