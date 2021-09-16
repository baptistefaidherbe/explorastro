/* eslint-disable react/button-has-type */
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaUserFriends } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiSettings, FiMap } from "react-icons/fi";
import { VscTelescope } from "react-icons/vsc";
import {
  GiPlanetConquest,
  GiRingedPlanet,
  GiFallingStar,
} from "react-icons/gi";
import { IconContext } from "react-icons";
import { AiOutlineBell } from "react-icons/ai";
import { TiMessages } from "react-icons/ti";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CgSearch } from "react-icons/cg";
import { BiMapPin } from "react-icons/bi";

import logo from "src/assets/img/logo-explorastro.png";
import avatar from "src/assets/img/avatar.png";

const Header = ({ handleLogout }) => (
  <div className="header">
    <header>
      <IconContext.Provider value={{ className: "iconsNav1" }}>
        <nav className="header__nav">
          <ul>
            <img src={logo} alt="logo ExplorAstro" className="logo" />

            <li>
              <MdDashboard />
              <span>Dashboard</span>
            </li>
            <li>
              <GiPlanetConquest />
              <span>Profil</span>
              <ul className="tooltip tooltip--profile">
                <IconContext.Provider value={{ className: "smallIcon" }}>
                  <li>
                    <img src={avatar} alt="avatar" className="profile-avatar" />
                    <span>Baptiste Faidherbe </span>
                    <span>Level 1</span>
                  </li>
                  <li>
                    <GiRingedPlanet />
                    <span>Explorations en cours (4)</span>
                  </li>
                  <li>
                    <GiFallingStar />
                    <span>Explorations organisées (1)</span>
                  </li>
                  <li>
                    <TiMessages />
                    <span>Messages</span>
                  </li>
                  <li>
                    <FiSettings />
                    <span>Configurer mon compte</span>
                  </li>
                </IconContext.Provider>
              </ul>
            </li>
            <li>
              <VscTelescope />
              <span> Les explorations</span>
              <ul className="tooltip tooltip--exploration">
                <IconContext.Provider value={{ className: "smallIcon" }}>
                  <li>
                    <BiMapPin />
                    <span>Rejoindre une exploration</span>
                  </li>
                  <li>
                    <VscTelescope />
                    <span>Organiser une exploration</span>
                  </li>
                </IconContext.Provider>
              </ul>
            </li>
            <li>
              <FaUserFriends />
              <span>Les membres</span>
            </li>

            <li>
              <FiMap />
              <span>Le guide de l'explorateur</span>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
      <IconContext.Provider value={{ className: "iconsNav2" }}>
        <nav className="header__nav2">
          <ul>
            <li className="search">
              <input
                type="search"
                placeholder="Rechercher une exploration"
                className="input-search"
              />
              <button>
                <div className="searchBtn">
                  <IconContext.Provider value={{ className: "searchIcon" }}>
                    <CgSearch />
                  </IconContext.Provider>
                  <span>Rechercher</span>
                </div>
              </button>
            </li>
            <li className="notif">
              <div className="alert">
                <AiOutlineBell className="bell" />
                <TiMessages className="message" />
              </div>
            </li>
            <li className="user">
              <div className="username">
                Bfaidherbe
                <img src={avatar} alt="avatar" className="avatar" />
              </div>
            </li>
            <li className="logout">
              <Link
                to="/"
                className="logoutLink"
                onClick={() => {
                  handleLogout();
                }}
              >
                <RiLogoutCircleRLine />
                <span> Déconnexion </span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </header>
  </div>
);

export default Header;

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
