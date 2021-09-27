/* eslint-disable react/button-has-type */
import React, { useEffect } from "react";
import explorationImg from "src/assets/img/bg_sky2.png";
import Navbar from "src/containers/Navbar";
import Loader from "src/components/Loader";
import PropTypes from "prop-types";
import { ImUsers } from "react-icons/im";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import * as dayjs from "dayjs";

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
          {explorationcreate[0] !== null &&
            explorationcreate.map((element) => (
              <div key={element.id} className="card">
                <img
                  src={explorationImg}
                  alt="explorationImg"
                  className="img"
                />
                <div className="content">
                  <div className="name">
                    <span>Nom: </span>
                    <p>{element.name}</p>
                  </div>
                  <div className="date">
                    <span>Date de l'exploration : </span>
                    <p>
                      {element.date
                        ? dayjs(element.date).format("DD-MM-YYYY à HH:mm")
                        : "-"}
                    </p>
                  </div>
                  <div className="departement">
                    <span>Lieu : </span>
                    <p>{element.departement ? element.departement : "-"}</p>
                  </div>
                  <div className="maxPerson">
                    <ImUsers />
                    <p>
                      {element.max_participants
                        ? element.max_participants
                        : "-"}
                    </p>
                  </div>
                  <div className="button-containt">
                    <Link to={`/formEvent/${element.id}`}>
                      <button className="button">
                        <BsPencil className="pencilIcon" />
                        Modifier
                      </button>
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="delete"
                      id={element.id}
                    >
                      <TiDeleteOutline className="deleteIcon" />
                      <p id={element.id}> Supprimer </p>
                    </button>
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
  onDelete: PropTypes.func.isRequired,
  eventLoading: PropTypes.func.isRequired,
};

Create.defaultProps = {
  explorationcreate: [],
};
