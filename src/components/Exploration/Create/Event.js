/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { ImUsers } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';
import * as dayjs from 'dayjs';
import explorationImg from 'src/assets/img/bg_sky2.png';

const Event = ({ element, handleDelete }) => (
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
      <div className="published">
        <span>Publié : </span>
        <p>{element.is_published ? 'Publié' : 'Non publié'}</p>
      </div>
      <div className="button-containt">
        <Link to={`/formEvent/${element.id}`}>
          <button className="button">
            <BsPencil className="pencilIcon" />
            Modifier
          </button>
        </Link>
        <button onClick={handleDelete} className="delete" id={element.id}>
          <TiDeleteOutline className="deleteIcon" />
          <p id={element.id}> Supprimer </p>
        </button>
      </div>
    </div>
  </div>
);

export default Event;

Event.propTypes = {
  element: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
