/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'src/containers/Navbar';
import { CgSearch } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import Modal from 'src/components/Modal';
import explosFilter from 'src/selectors/filter';
import getDistance from 'src/selectors/getDistance';
import Loader from 'src/components/Loader';
import Event from './Event';
import Map from './Map';

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
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }

    setTimeout(async () => {
      const position = await getPosition();
      const myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      userGeoloc(myPosition);
    }, 1000);

    // main();
  }, []);

  if (isEventLoading) {
    return <Loader />;
  }

  const explos = explorations.map((element) => {
    const lat = parseFloat(element.geog[0], 10);
    const long = parseFloat(element.geog[1], 10);
    const coord = [lat, long];
    const distance = getDistance(coord, myGeoloc);
    element.coord = coord;
    element.distance = distance;
    return element;
  });

  const filterEvents = explosFilter(
    explos,
    departement,
    fieldZone,
    searchName,
    searchAuthor,
  );

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="mapExploration">
          <div className="explorationList">
            {filterEvents.map((element) => (
              <Event key={element.id} exploration={element} />
            ))}
          </div>
          <div className="map">
            <div className="search">
              <GiHamburgerMenu className="search_icon" onClick={handleClick} />
              <div className="search_text">
                <CgSearch className="Search_icon" />
                <span>La carte des explorations</span>

                <Modal
                  togledModal={togledModal}
                  onClick={onClickClosedModal}
                  onChangeArea={onChangeArea}
                  fieldZone={fieldZone}
                  onChange={onChange}
                  explosFilter={explosFilter}
                  searchAuthor={searchAuthor}
                  searchName={searchName}
                  departement={departement}
                />
              </div>
            </div>
            <Map
              fieldZone={fieldZone}
              positionGeoloc={myGeoloc}
              filterEvents={filterEvents}
            />
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
  searchAuthor: PropTypes.string.isRequired,
  userGeoloc: PropTypes.func.isRequired,
  myGeoloc: PropTypes.object.isRequired,
  isEventLoading: PropTypes.bool.isRequired,
};

export default Participate;
