import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Navbar from "src/containers/Navbar";
import { CgSearch } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscTelescope } from "react-icons/vsc";
import Modal from "src/components/Modal";
import Event from "./Event";
import Map from "./Map";

const Participate = ({
  getEvents,
  explorations,
  onClickModal,
  togledModal,
  onClickClosedModal,
  fieldZone,
  onChangeArea,
}) => {
  useEffect(() => {
    getEvents();
  }, []);

  const handleClick = () => {
    onClickModal();
  };

  return (
    <>
      <Modal
        togledModal={togledModal}
        onClick={onClickClosedModal}
        onChangeArea={onChangeArea}
        fieldZone={fieldZone}
      />
      <div className="container">
        <Navbar />
        <div className="participate">
          <div className="explorationList">
            {explorations.map((element) => (
              <Event key={element.id} exploration={element} />
            ))}
          </div>
          <div className="stat">
            <div className="stat_title">
              <h1>La carte des explorations</h1>
              <p>Sélectioner la sortie désirée</p>
            </div>
            <div className="stat_container">
              <div className="item">
                <div className="card">
                  <VscTelescope className="iconTelescope" />
                  <h3>Explorations en cours</h3>
                  <div className="nbrExploration">
                    <div className="circle">{explorations?.length}</div>
                  </div>
                </div>
                <div className="card">ezfzefzefzef</div>
                <div className="card">ezfzefzefzef</div>
              </div>
              <div className="search">
                <GiHamburgerMenu
                  className="search_icon"
                  onClick={handleClick}
                />
                <div className="search_text">
                  <CgSearch className="Search_icon" />
                  <span>Rechercher</span>
                </div>
              </div>
              <Map explorations={explorations} fieldZone={fieldZone} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Participate.propTypes = {
  getEvents: PropTypes.func.isRequired,
  explorations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickModal: PropTypes.func.isRequired,
  togledModal: PropTypes.bool.isRequired,
  onClickClosedModal: PropTypes.func.isRequired,
  fieldZone: PropTypes.number.isRequired,
  onChangeArea: PropTypes.func.isRequired,
};

export default Participate;
