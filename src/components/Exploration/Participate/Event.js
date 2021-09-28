/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";
import * as dayjs from "dayjs";
import explorationImg from "src/assets/img/bg_sky2.png";

const Event = ({ exploration }) => (
  <div className="card">
    <h2>{exploration.name}</h2>
    <img
      src={exploration.image_url ? exploration.image_url : explorationImg}
      alt="explorationImg"
      className="img"
    />
    <div className="description"> <span>Description : </span>{exploration.description}</div>
    <div className="author">
      <span>Organisateur : </span>
      {exploration.username}
    </div>
    <div className="date">
      <span>Date de l'exploration : </span>
      {dayjs(exploration.date).format("DD-MM-YYYY à HH:mm")}
    </div>
    <div className="departement">
      <span>Lieu : </span>
      {exploration.departement}
    </div>
    <button className="button">Participer</button>
  </div>
);

Event.propTypes = {
  exploration: PropTypes.object.isRequired,
};

export default Event;
