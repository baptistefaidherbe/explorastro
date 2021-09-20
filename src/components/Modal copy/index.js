/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";

const Modal = ({ togledModal, onClick, onChangeArea, fieldZone }) => {
  const handleOnclick = () => {
    onClick();
  };

  const handleOnchange = (event) => {
    const { value } = event.target;
    const zone = parseInt(value, 10);
    onChangeArea(zone);
  };

  return (
    <>
      {togledModal ? (
        <div id="myModal" className="modal">
          <div className="modal_box">
            <div className="modal_box-header">
              <span className="close" onClick={handleOnclick}>
                &times;
              </span>
              <p>ma modal</p>
            </div>
            <div className="modal_box-content">
              <form>
                <label htmlFor="searchName">
                  Rechercher par nom de sortie :
                  <input
                    type="search"
                    placeholder="Rechercher une exploration"
                    className="input-search"
                    name="searchName"
                  />
                </label>

                <label htmlFor="searchDepartement">
                  Rechercher par département :
                  <input
                    type="search"
                    placeholder="Rechercher une exploration"
                    className="input-search"
                    name="searchDepartement"
                  />
                </label>

                <label htmlFor="searchAuthor">
                  Rechercher par organisateur :
                  <input
                    type="search"
                    placeholder="Rechercher une exploration"
                    className="input-search"
                    name="searchAuthor"
                  />
                </label>

                <label htmlFor="searchAuthor">
                  Dans un rayon autour de : {fieldZone}
                  <input
                    type="range"
                    id="km"
                    name="distance"
                    min="0"
                    max="400"
                    step="10"
                    onChange={handleOnchange}
                  />
                </label>

                <button>Rechercher</button>
              </form>
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
  onClick: PropTypes.func.isRequired,
  onChangeArea: PropTypes.func.isRequired,
  fieldZone: PropTypes.number.isRequired,
};

export default Modal;
