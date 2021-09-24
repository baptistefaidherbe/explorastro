/* eslint-disable react/button-has-type */
import React, { useEffect } from "react";
import explorationImg from "src/assets/img/bg_sky2.png";

const create = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const explorationCreate = user.user.explorationcreate;

  return (
    <div className="card">
      {explorationCreate.map((element) => (
        <>
          <img src={explorationImg} alt="explorationImg" className="img" />
          <div className="description">{element.description}</div>
          <div className="author">
            <span>Organisateur : </span>
            {element.username}
          </div>
          <div className="date">
            <span>Date de l'exploration : </span>
            {element.date}
          </div>
          <div className="departement">
            <span>Lieu : </span>
            {element.departement}
          </div>
          <button className="button">Participer</button>
        </>
      ))}
    </div>
  );
};

export default create;
