/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Modal = ({ togledModal, onClickModal }) => {
  const handleOnclick = () => {
    onClickModal();
  };

  // useEffect(() => {
  //   onClickModal();
  // }, []);
  return (
    <>
      {togledModal ? (
        <div id="myModal" className="modal2">
          <div className="modal2_box">
            <div className="modal2_box-header">
              <span className="close" onClick={handleOnclick}>
                &times;
              </span>
              <p>ma modal</p>
            </div>
            <div className="modal2_box-content">
              <p> Vos modifications ont bien été enregistrées avec succès</p>
              <Link onClick={handleOnclick} to="/create">
                <button>Mes sorties</button>
              </Link>
            </div>
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
  onClickModal: PropTypes.func.isRequired,
};

export default Modal;
