/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AiOutlineBell } from 'react-icons/ai';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { CgSearch } from 'react-icons/cg';
import avatar from 'src/assets/img/avatar.png';

const Navbar = ({
  handleLogout,
  username,
  notification,
  notificationSender,
  toggleNotif,
  onClickNotif,
  onClickRead,
}) => {
  const handleClickNotif = () => {
    onClickNotif();
  };
  const handleOnClickRead = () => {
    onClickRead();
    // window.location.href = '/message';
  };
console.log(notificationSender)

  return (
    <nav className="navBar">
      <ul className="navBar_container">
        <li className="navBar_search">
          <input
            type="search"
            placeholder="Rechercher une exploration"
            className="input-search"
          />
          <button>
            <div className="searchBtn">
              <CgSearch />
              <span>Rechercher</span>
            </div>
          </button>
        </li>
        <li className="navBar_notif">
          <div className="alert" onClick={handleClickNotif}>
            <AiOutlineBell className="bell" />
            {notification > 0 ? (
              <span className="notification">{notification}</span>
            ) : (
              ''
            )}
            {toggleNotif ? (
              <div className="bubble">
                {notification > 0
                  ? notificationSender?.map((element, index) => (
                    <p key={index}>
                      {element && `${element} vient de vous envoyer un message` }
                    </p>
                  ))
                  : ''}
                {notification > 0 ? (
                  <button onClick={handleOnClickRead}>Marqué comme lu</button>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        </li>
        <li className="navBar_user">
          <div className="username">
            {username}
            <img src={avatar} alt="avatar" className="avatar" />
          </div>
        </li>
        <li className="navBar_logout">
          <Link
            to="/login"
            className="logoutLink"
            onClick={() => {
              handleLogout();
              window.location.reload();
            }}
          >
            <RiLogoutCircleRLine />
            <span> Déconnexion </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  notification: PropTypes.number.isRequired,
  notificationSender: PropTypes.array.isRequired,
  onClickNotif: PropTypes.func.isRequired,
  toggleNotif: PropTypes.bool.isRequired,
  onClickRead: PropTypes.func.isRequired,
};
