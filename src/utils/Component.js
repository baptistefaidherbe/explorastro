import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'src/containers/Sidebar';

const Component = ({ Children, isLogged, Login }) => {
  if (isLogged) {
    return (
      <>
        <Sidebar />
        <Children />
      </>
    );
  }
  return <Login />;
};

export default Component;

Component.propTypes = {
  Children: PropTypes.object.isRequired,
  isLogged: PropTypes.bool.isRequired,
  Login: PropTypes.object.isRequired,
};
