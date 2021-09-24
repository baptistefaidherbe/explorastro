/* eslint-disable react/button-has-type */
import React, { useEffect } from "react";
import explorationImg from "src/assets/img/bg_sky2.png";
import Navbar from "src/containers/Navbar";
import Loader from "src/components/Loader";
import PropTypes from "prop-types";
import { ImUsers } from "react-icons/im";

const Create = ({
  getMyEvents,
  onSubmit,
  onChange,
  explorationcreate,
  isEventLoading,
  name,
}) => {
  useEffect(() => {
    getMyEvents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  if (isEventLoading) {
    return <Loader />;
  }
console.log(explorationcreate);
  return (
    <div className="container">
      <Navbar />
      <div className="create">
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
              <div className="button">
                <button>Créer</button>
              </div>
            </form>
          </div>
          {explorationcreate[0] !== null && explorationcreate.map((element) => (
            <div key={element.id} className="card">
              <img src={explorationImg} alt="explorationImg" className="img" />
              <div className="content">
                <div className="name">
                  <span>Nom: </span>
                  <p>{element.name}</p>
                </div>
                <div className="date">
                  <span>Date de l'exploration : </span>
                  <p>{element.date ? element.date : "-"}</p>
                </div>
                <div className="departement">
                  <span>Lieu : </span>
                  <p>{element.departement ? element.departement : "-"}</p>
                </div>
                <div className="maxPerson">
                  <ImUsers />
                  <p>
                    {element.max_participants ? element.max_participants : "-"}
                  </p>
                </div>
                <div className="button">
                  <button>Modifier</button>
                </div>
              </div>
            </div>
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
};

Create.defaultProps = {
  explorationcreate: [],
};
