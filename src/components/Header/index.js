/* eslint-disable react/button-has-type */
import React from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { FiSettings, FiMap } from 'react-icons/fi';
import { VscTelescope } from 'react-icons/vsc';
import {
  GiPlanetConquest,
  GiRingedPlanet,
  GiFallingStar,
} from 'react-icons/gi';
import { IconContext } from 'react-icons';
import { AiOutlineBell } from 'react-icons/ai';
import { TiMessages } from 'react-icons/ti';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { CgSearch } from 'react-icons/cg';
import { BiMapPin } from 'react-icons/bi';

import logo from 'src/assets/img/logo-explorastro.png';
import avatar from 'src/assets/img/avatar.png';

const Header = () => (
  <div className="header">
    <header>
      <IconContext.Provider value={{ className: 'icons-nav1' }}>
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
                <IconContext.Provider value={{ className: 'small-icon' }}>
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
                <IconContext.Provider value={{ className: 'small-icon' }}>
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
      <IconContext.Provider value={{ className: 'icons-nav2' }}>
        <nav className="header__nav2">
          <ul>
            <li className="flex1">
              <input
                type="search"
                placeholder="Rechercher une exploration"
                className="input-search"
              />
              <button>
                <div className="search">
                  <IconContext.Provider value={{ className: 'search-icon' }}>
                    <CgSearch />
                  </IconContext.Provider>
                  <span>Rechercher</span>
                </div>
              </button>
            </li>
            <li className="flex2">
              <span>
                <AiOutlineBell />
              </span>
              <span>
                <TiMessages />
              </span>
            </li>
            <li className="flex3">
              <div className="user">
                Bfaidherbe
                <img src={avatar} alt="avatar" className="avatar" />
              </div>
            </li>
            <li className="flex4">
              <RiLogoutCircleRLine />
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </header>
  </div>
);

export default Header;
