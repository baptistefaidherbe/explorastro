/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import dpt from 'src/data/departements-region.json';

const Modal = ({
  togledModal, onChangeArea, fieldZone, onChange,
}) => {
  const handleOnchangeArea = (event) => {
    const { value } = event.target;
    const zone = parseInt(value, 10);
    onChangeArea(zone);
  };
  const handleOnchange = (event) => {
    const { value, name } = event.target;
    onChange(value, name);
  };
  return (
    <>
      {togledModal ? (
        <div className="modal_box">
          <div className="modal_box-content">
            <form>
              <div className="col">
                <label htmlFor="searchName">
                  Rechercher par nom de sortie :
                  <input
                    type="search"
                    placeholder="nom de l'exploration"
                    className="input-search"
                    name="searchName"
                  />
                </label>

                <label htmlFor="searchDepartement">
                  Rechercher par département :
                  <select
                    onClick={handleOnchange}
                    name="departement"
                    id="departement"
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
              <div className="col">
                <label htmlFor="searchAuthor">
                  Rechercher par organisateur :
                  <input
                    type="search"
                    placeholder="nom de l'organisateur"
                    className="input-search"
                    name="searchAuthor"
                  />
                </label>

                <label htmlFor="searchAuthor">
                  Dans un rayon autour de : {fieldZone} km
                  <input
                    type="range"
                    id="km"
                    name="distance"
                    min="0"
                    max="400"
                    step="10"
                    onChange={handleOnchangeArea}
                  />
                </label>
              </div>
              <button>Rechercher</button>
            </form>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

Modal.propTypes = {
  togledModal: PropTypes.bool.isRequired,
  onChangeArea: PropTypes.func.isRequired,
  fieldZone: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Modal;
