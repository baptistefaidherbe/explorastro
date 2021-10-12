/* eslint-disable react/button-has-type */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FaUserFriends } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiSettings, FiMap } from "react-icons/fi";
import { VscTelescope } from "react-icons/vsc";
import { Link } from "react-router-dom";
import {
  GiPlanetConquest,
  GiRingedPlanet,
  GiFallingStar,
} from "react-icons/gi";

import { TiMessages } from "react-icons/ti";
import { BiMapPin } from "react-icons/bi";
import avatar from "src/assets/img/avatar.png";
import logo from "src/assets/img/logo-explorastro.png";

const SideBar = ({
  username,
  explorationParticipate,
  explorationCreate,
  getMyEventsParticipateOrganise,
}) => {
  useEffect(() => {
    getMyEventsParticipateOrganise();
  }, []);

  return (
    <aside className="sideBar">
      <img src={logo} alt="logo ExplorAstro" className="logo" />
      <ul className="sideBar_content">
        <li>
          <MdDashboard className="sideBar_content_icons" />
          <span>Dashboard</span>
        </li>
        <li>
          <GiPlanetConquest className="sideBar_content_icons" />
          <span>Profil</span>
          <ul className="sideBar_content_tooltip tooltip--profile">
            <li>
              <img src={avatar} alt="avatar" className="profile-avatar" />
              <span>{username}</span>
              <span>Level 1</span>
            </li>
            <li>
              <GiRingedPlanet className="sideBar_content_icons" />
              <Link to="/myEventsParticipate">
                Explorations en cours (
                {explorationParticipate[0] !== null
                  ? explorationParticipate.length
                  : 0}
                )
              </Link>
            </li>
            <li>
              <GiFallingStar className="sideBar_content_icons" />
              <Link to="/create">
                Explorations organisées (
                {explorationCreate[0] !== null ? explorationCreate.length : 0})
              </Link>
            </li>
            <li>
              <TiMessages className="sideBar_content_icons" />
              <Link to="/message">Messages</Link>
            </li>
            <li>
              <FiSettings className="sideBar_content_icons" />
              <span>Configurer mon compte</span>
            </li>
          </ul>
        </li>
        <li>
          <VscTelescope className="sideBar_content_icons" />
          <span> Les explorations</span>
          <ul className="sideBar_content_tooltip tooltip--exploration">
            <li>
              <BiMapPin />
              <Link to="/map">Rejoindre une exploration</Link>
            </li>
            <li>
              <VscTelescope className="sideBar_content_icons" />
              <Link to="/create">Organiser une exploration</Link>
            </li>
          </ul>
        </li>
        <li>
          <FaUserFriends className="sideBar_content_icons" />
          <Link to="/member">Les membres</Link>
        </li>

        <li>
          <FiMap className="sideBar_content_icons" />
          <span>Le guide de l'explorateur</span>
        </li>
      </ul>
    </aside>
  );
};
export default SideBar;

SideBar.propTypes = {
  username: PropTypes.string.isRequired,
  explorationParticipate: PropTypes.arrayOf(PropTypes.object),
  explorationCreate: PropTypes.arrayOf(PropTypes.object),
  getMyEventsParticipateOrganise: PropTypes.func.isRequired,
};

SideBar.defaultProps = {
  explorationParticipate: [],
  explorationCreate: [],
};
