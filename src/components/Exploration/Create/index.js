/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import explorationImg from 'src/assets/img/bg_sky2.png';
import Navbar from 'src/containers/Navbar';
import Loader from 'src/components/Loader';
import PropTypes from 'prop-types';
import Event from './Event';

const Create = ({
  getMyEvents,
  onSubmit,
  onChange,
  explorationcreate,
  isEventLoading,
  name,
  onDelete,
  eventLoading,
}) => {
  useEffect(() => {
    getMyEvents();
    return () => {
      eventLoading();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleDelete = (e) => {
    onDelete(e.target.id);
  };

  if (isEventLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Navbar />
      <div className="create">
        <h1 className="mainTitle">Organiser une exploration</h1>
        <div className="events">
          <div className="card">
            <img src={explorationImg} alt="explorationImg" className="img" />
            <form onSubmit={handleSubmit} className="content">
              <div className="name">
                <span>Nom: </span>
                <input
                  type="text"
                  placeholder="nom de l'exploration"
                  className="inputName"
                  name="Name"
                  onChange={handleChange}
                  value={name}
                />
              </div>
              <div className="createBtn">
                <button>Créer</button>
              </div>
            </form>
          </div>
          {explorationcreate[0] !== null
            && explorationcreate.map((element) => (
              <Event key={element.id} element={element} handleDelete={handleDelete} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Create;

Create.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  getMyEvents: PropTypes.func.isRequired,
  explorationcreate: PropTypes.arrayOf(PropTypes.object),
  isEventLoading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  eventLoading: PropTypes.func.isRequired,
};

Create.defaultProps = {
  explorationcreate: [],
};
