/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React from 'react';
import Navbar from 'src/containers/Navbar';
import explorationImg from 'src/assets/img/bg_sky2.png';
import dpt from 'src/data/departements-region.json';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import Comment from './Comment';
import Map from './Map';

const Form = ({ getCoordLocation }) => {
  const handleOnchange = () => {
    console.log('toto');
  };
  return (
    <div className="container">
      <Navbar />
      <div className="form">
        <div className="grp1">
          <div className="left">
            <img
              src={explorationImg}
              alt="explorationImg"
              className="imgEvent"
            />
            <button className="uploadBtn">Upload Image</button>
            <h3>Commentaires</h3>
            <div className="comments">
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
            </div>
          </div>
          <div className="grp2">
            <input
              type="text"
              placeholder="nom de l'exploration"
              className="name"
              name="name"
              onChange={handleOnchange}
              //   value={searchName}
            />

            <textarea
              className="description"
              name="description"
              rows="10"
              cols="70"
              placeholder="Description"
            />
            <div className="grp3">
              <label htmlFor="date">
                Date
                <input
                  className="date"
                  type="datetime-local"
                  name="date"
                  //   value={
                  //     eventToModify.date
                  //       ? dayjs(eventToModify.date).format("YYYY-MM-DDTHH:mm")
                  //       : dayjs().format("YYYY-MM-DDTHH:mm")
                  //   }
                  onChange={handleOnchange}
                />
              </label>
              <label htmlFor="departement">
                Département
                <select
                  onChange={handleOnchange}
                  name="departement"
                  className="departement"
                  // value={departement}
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
            <Map getCoordLocation={getCoordLocation} />
            <div className="grp3">
              <label htmlFor="maxPerson" className="maxPerson">
                Max participant
                <input
                  type="range"
                  name="maxPerson"
                  min="0"
                  max="50"
                  step="1"
                  // value={fieldZone}
                  onChange={handleOnchange}
                />
              </label>
              <label htmlFor="published" className="published">
                Publier l'exploration
                <Switch
                  name="published"
                  onChange={handleOnchange}
                  checked={false}
                  className="swPublished"
                />
              </label>
            </div>
            <button className="submiteBtn">Modifier</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

Form.propTypes = {
  getCoordLocation: PropTypes.func.isRequired,
};
