import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'src/containers/Sidebar';

const Component = ({
  Children, isLogged, Login, id,
}) => {
  if (isLogged) {
    return (
      <>
        <Sidebar />
        <Children id={id && id} />
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
  id: PropTypes.number,
};

Component.defaultProps = {
  id: null,
};
