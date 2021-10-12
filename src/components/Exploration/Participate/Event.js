/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { ImUsers } from 'react-icons/im';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';
import explorationImg from 'src/assets/img/bg_sky2.png';

const Event = ({ element }) => (
  <div key={element.id} className="card">
    <img
      src={element.image_url ? element.image_url : explorationImg}
      alt="explorationImg"
      className="img"
    />
    <div className="content">
      <div className="name">
        <span>Nom: </span>
        <p>{element.name}</p>
      </div>
      <div className="date">
        <span>Date de l'exploration : </span>
        <p>
          {element.date
            ? dayjs(element.date).format('DD-MM-YYYY à HH:mm')
            : '-'}
        </p>
      </div>
      <div className="departement">
        <span>Lieu : </span>
        <p>{element.departement ? element.departement : '-'}</p>
      </div>
      <div className="maxPerson">
        <ImUsers />
        <p>{element.max_participants ? element.max_participants : '-'}</p>
      </div>
      <div className="button-containt">
        <Link to={`/exploration/${element.id}`}>
          <button className="button">
            Info
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default Event;

Event.propTypes = {
  element: PropTypes.object.isRequired,
};
