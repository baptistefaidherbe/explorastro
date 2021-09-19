import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Navbar from "src/containers/Navbar";
import { CgSearch } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscTelescope } from "react-icons/vsc";
import Event from "./Event";
import Map from "./Map";

const Participate = ({ getEvents, explorations }) => {
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <>
      <div className="container">
        <Navbar />
        <div className="participate">
          <div id="myModal" className="modal">
            <div className="modal_box">
              <div className="modal_box-header">
                <span className="close">&times;</span>
                <p>ma modal</p>
              </div>
              <div className="modal_box-content">
                <p>Some text in the Modal..</p>
              </div>
            </div>
          </div>

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
                <GiHamburgerMenu className="search_icon" />
                <div className="search_text">
                  <CgSearch />
                  <span>Rechercher</span>
                </div>
              </div>
              <Map explorations={explorations} />
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
};

export default Participate;
