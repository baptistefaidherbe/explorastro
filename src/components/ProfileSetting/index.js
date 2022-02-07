/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import Navbar from 'src/containers/Navbar';
import PropTypes from 'prop-types';
import explorationImg from 'src/assets/img/bg_sky2.png';

const ProfileSetting = ({
  getUserById, userToModify, onSubmit, uploadIllustration, onChange,
}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { id } = user.user;

  useEffect(() => {
    getUserById(id);
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(id);
  };

  const handleOnchange = (e) => {
    onChange(e.target.value, e.target.name);
  };

  const handleClick = () => {

  };

  const handleIllustrationUpload = (event) => {
    uploadIllustration(event.target.files[0], id);
  };
  return (
    <div className="container">
      <Navbar />
      {/* <h1 className="mainTitle">Configurer mon compte</h1> */}
      <div className="profileSetting">
        <div className="content">
          <div className="banner">
            <img
              src={explorationImg}
              alt="explorationImg"
              className="imgBanner"
            />
            <div className="imgEvent">
              <img
                src={userToModify.avatar_url ? userToModify.avatar_url : ''}
                alt="avatar"
                className="img"
              />
              <input
                className="uploadBtn"
                type="file"
                name="image"
                id="upload-illustration"
                accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                onChange={handleIllustrationUpload}
              />
            </div>
          </div>
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              placeholder="Prenom"
              className="firstNanme"
              name="firstname"
              onChange={handleOnchange}
              value={userToModify.firstname ? userToModify.firstname : ''}
            />
            <input
              type="text"
              placeholder="Nom"
              className="lastname"
              name="lastname"
              onChange={handleOnchange}
              value={userToModify.lastname ? userToModify.lastname : ''}
            />
            <input
              type="email"
              placeholder="email"
              className="email"
              name="email"
              onChange={handleOnchange}
              value={userToModify.email ? userToModify.email : ''}
            />
            <input
              type="text"
              placeholder="ville"
              className="city"
              name="city"
              onChange={handleOnchange}
              value={userToModify.city ? userToModify.city : ''}
            />
            <textarea
              className="bio"
              name="bio"
              onChange={handleOnchange}
              value={userToModify.bio ? userToModify.bio : ''}
            />
            <input
              type="password"
              placeholder="mot de passe"
              className="password"
              name="password"
              onChange={handleOnchange}
              value={userToModify.password ? userToModify.password : ''}
            />

            <button onClick={handleClick} className="submiteBtn" id="submit">
              Modifier
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};

ProfileSetting.propTypes = {
  getUserById: PropTypes.func.isRequired,
  userToModify: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  uploadIllustration: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProfileSetting;
