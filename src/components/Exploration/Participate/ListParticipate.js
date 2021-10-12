/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import Navbar from 'src/containers/Navbar';
import PropTypes from 'prop-types';
import Loader from 'src/components/Loader';
import Event from './Event';

const ListParticipate = ({
  getMyEventsParticipateOrganise,
  explorationParticipate,
  isEventLoading,
}) => {
  useEffect(() => {
    getMyEventsParticipateOrganise();
  }, []);

  if (isEventLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Navbar />
      <div className="listParticipate">
        <h1 className="mainTitle">Mes explorations en cours</h1>
        <div className="events">
          {explorationParticipate[0] !== null
            ? explorationParticipate?.map((element) => (
              <Event key={element.id} element={element} />
            ))
            : 'Vous ne participez à aucune exploration !'}
        </div>
      </div>
    </div>
  );
};

export default ListParticipate;

ListParticipate.propTypes = {
  getMyEventsParticipateOrganise: PropTypes.func.isRequired,
  explorationParticipate: PropTypes.arrayOf(PropTypes.object),
  isEventLoading: PropTypes.bool.isRequired,
};

ListParticipate.defaultProps = {
  explorationParticipate: [],
};
