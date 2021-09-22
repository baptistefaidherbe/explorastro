/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";
import dpt from "src/data/departements-region.json";

const Modal = ({
  togledModal,
  onChangeArea,
  fieldZone,
  onChange,
  onSubmit,
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
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event.target[0].value, event.target[0].name);
  };
  return (
    <>
      {togledModal ? (
        <div className="modal_box">
          <div className="modal_box-content">
            <div className="col">
              <form onSubmit={handleSubmit}>
                <label htmlFor="searchName">
                  Rechercher par nom de sortie :
                  <input
                    type="search"
                    placeholder="nom de l'exploration"
                    className="input-search"
                    name="searchName"
                    onChange={handleOnchange}
                  />
                  <button>Rechercher</button>
                </label>
              </form>
              <form onSubmit={handleSubmit}>
                <label htmlFor="departement">
                  Rechercher par département :
                  <select name="departement" id="departement">
                    <option value="">Choisisez un département</option>
                    {dpt.map((element) => (
                      <option key={element.num_dep} value={element.dep_name}>
                        {element.dep_name}
                      </option>
                    ))}
                  </select>
                  <button>Rechercher</button>
                </label>
              </form>
            </div>
            <div className="col">
              <form onSubmit={handleSubmit}>
                <label htmlFor="searchAuthor">
                  Rechercher par organisateur :
                  <input
                    type="search"
                    placeholder="nom de l'organisateur"
                    className="input-search"
                    name="searchAuthor"
                  />
                  <button>Rechercher</button>
                </label>
              </form>
              <label htmlFor="distance">
                Dans un rayon autour de : {fieldZone} km
                <input
                  type="range"
                  id="km"
                  name="distance"
                  min="0"
                  max="400"
                  step="10"
                  value={fieldZone}
                  onChange={handleOnchangeArea}
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

Modal.propTypes = {
  togledModal: PropTypes.bool.isRequired,
  onChangeArea: PropTypes.func.isRequired,
  fieldZone: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Modal;
