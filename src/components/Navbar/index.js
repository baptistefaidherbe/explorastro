/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AiOutlineBell } from 'react-icons/ai';
import { TiMessages } from 'react-icons/ti';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { CgSearch } from 'react-icons/cg';

import avatar from 'src/assets/img/avatar.png';

const Navbar = ({ handleLogout, username }) => (
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
        <div className="alert">
          <AiOutlineBell className="bell" />
          <TiMessages className="message" />
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

export default Navbar;

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};
