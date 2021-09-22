/* eslint-disable max-len */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Navbar from "src/containers/Navbar";
import { CgSearch } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscTelescope } from "react-icons/vsc";
import Modal from "src/components/Modal";
import explosFilter from "src/selectors/filter";
import Loader from 'src/components/Loader';
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
  onChange,
  departement,
  searchName,
  onSubmit,
  searchAuthor,
  userGeoloc,
  myGeoloc,
  isEventLoading,
}) => {
  useEffect(() => {
    getEvents();
  }, []);
  const handleClick = () => {
    onClickModal();
  };

  useEffect(() => {
    function getPosition() {
      // Simple wrapper
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }

    async function main() {
      const position = await getPosition(); // wait for getPosition to complete
      const myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      userGeoloc(myPosition);
    }

    main();
  }, []);
  if (isEventLoading) {
    return <Loader />;
  }
  return (
    <>
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

                  <Modal
                    togledModal={togledModal}
                    onClick={onClickClosedModal}
                    onChangeArea={onChangeArea}
                    fieldZone={fieldZone}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    explosFilter={explosFilter}
                  />
                </div>
              </div>
              <Map
                explorations={explorations}
                fieldZone={fieldZone}
                departement={departement}
                searchName={searchName}
                searchAuthor={searchAuthor}
                explosFilter={explosFilter}
                positionGeoloc={myGeoloc}
              />
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
  onChange: PropTypes.func.isRequired,
  departement: PropTypes.string.isRequired,
  searchName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  searchAuthor: PropTypes.string.isRequired,
  userGeoloc: PropTypes.func.isRequired,
  myGeoloc: PropTypes.object.isRequired,
  isEventLoading: PropTypes.bool.isRequired,
};

export default Participate;
