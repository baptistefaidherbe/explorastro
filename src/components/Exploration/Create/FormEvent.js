/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import Navbar from 'src/containers/Navbar';
import explorationImg from 'src/assets/img/bg_sky2.png';
import dpt from 'src/data/departements-region.json';
import Modal from 'src/components/Modal2';
import Switch from 'react-switch';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import Comment from './Comment';
import Map from './Map';

const FormEvent = ({
  id,
  getEventData,
  eventToModify,
  onChange,
  onPublished,
  getCoordLocation,
  onSubmit,
  togledModal,
  onClickModal,
  uploadIllustration,
}) => {
  useEffect(() => {
    getEventData(id);
  }, []);

  const handleOnchange = (e) => {
    onChange(e.target.value, e.target.name);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(id);
  };

  const handleClick = () => {
    if (
      eventToModify.name !== null
      && eventToModify.description !== null
      && eventToModify.date !== null
      && eventToModify.geog !== null
      && eventToModify.max_participants !== null
    ) {
      onClickModal();
    }
  };

  const handlePublished = () => {
    onPublished();
  };

  const handleIllustrationUpload = (event) => {
    uploadIllustration(event.target.files[0], id);
  };

  return isEmpty(eventToModify) ? (
    ''
  ) : (
    <div className="container">
      <Modal onClickModal={onClickModal} togledModal={togledModal} />
      <Navbar />

      <div className="formEvent">
        <form className="formEvent_content" onSubmit={handleOnSubmit}>
          <div className="imgEvent">
            <img
              src={
                eventToModify.image_url
                  ? eventToModify.image_url
                  : explorationImg
              }
              alt="explorationImg"
              className="img"
            />
            <input
              className=" button uploadBtn"
              type="file"
              name="image"
              id="upload-illustration"
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
              onChange={handleIllustrationUpload}
            />
          </div>
          {eventToModify?.comments[0].content !== null && (
            <>
              <h3>Commentaires</h3>
              <div className="comments">
                {eventToModify.comments.map((element) => (
                  <Comment key={element.id} element={element} />
                ))}
              </div>
            </>
          )}

          <input
            type="text"
            placeholder="nom de l'exploration"
            className="name"
            name="name"
            onChange={handleOnchange}
            required="required"
            value={eventToModify.name ? eventToModify.name : ''}
          />

          <textarea
            className="description"
            name="description"
            rows="10"
            cols="70"
            required="required"
            placeholder="Description"
            value={eventToModify.description ? eventToModify.description : ''}
            onChange={handleOnchange}
          />
          <div className="grp">
            <label htmlFor="date">
              Date
              <input
                className="date"
                type="datetime-local"
                name="date"
                required="required"
                value={
                  eventToModify.date
                    ? dayjs(eventToModify.date).format('YYYY-MM-DDTHH:mm')
                    : ''
                }
                onChange={handleOnchange}
              />
            </label>
            <label htmlFor="departement">
              Département
              <select
                onChange={handleOnchange}
                name="departement"
                className="departement"
                required="required"
                value={
                  eventToModify.departement ? eventToModify.departement : ''
                }
              >
                <option value="">Choisisez un département</option>
                {dpt.map((element) => (
                  <option key={element.num_dep} value={element.dep_name}>
                    {element.dep_name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <Map
            getCoordLocation={getCoordLocation}
            coord={eventToModify.geog ? eventToModify.geog : null}
          />
          <div className="grp">
            <label htmlFor="maxPerson" className="maxPerson">
              Max participant {eventToModify.max_participants}
              <input
                type="range"
                name="max_participants"
                min="1"
                max="50"
                step="1"
                value={
                  eventToModify.max_participants
                    ? eventToModify.max_participants
                    : 1
                }
                onChange={handleOnchange}
              />
            </label>
            <label htmlFor="published" className="published">
              Publier l'exploration
              <Switch
                name="is_published"
                onChange={handlePublished}
                checked={eventToModify.is_published}
                className="swPublished"
              />
            </label>
          </div>
          <div className="formEvent_button">
            <button onClick={handleClick} className="submiteBtn" id="submit">
              Modifier
            </button>
            <Link to="/create" className="button submiteBtn">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEvent;

FormEvent.propTypes = {
  id: PropTypes.number.isRequired,
  getEventData: PropTypes.func.isRequired,
  eventToModify: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onPublished: PropTypes.func.isRequired,
  getCoordLocation: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  togledModal: PropTypes.bool.isRequired,
  onClickModal: PropTypes.func.isRequired,
  uploadIllustration: PropTypes.func.isRequired,
};
