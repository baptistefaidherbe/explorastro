/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import Navbar from 'src/containers/Navbar';
import PropTypes from 'prop-types';
// import { AiOutlineFileImage } from "react-icons/ai";
import { BiMessage } from 'react-icons/bi';
import banner from 'src/assets/img/bg_sky2.png';
import { Link } from 'react-router-dom';
import Event from './Event';

const Profile = ({
  userById,
  conversations,
  createConversation,
  getConversation,
  id,
  getUserById,
}) => {
  const sender = JSON.parse(localStorage.getItem('user'));
  const senderId = sender.user.id;

  const filterConversation = conversations.find(
    (element) => element.members[1] === userById?.id.toString()
      || element.members[0] === userById?.id.toString(),
  );

  useEffect(() => {
    getUserById(id);
  }, []);

  useEffect(() => {
    getConversation(id);
  }, [id]);

  const handleClickMessage = (e) => {
    const receiverName = e.target.className;
    if (!filterConversation) {
      createConversation(senderId, userById.id, receiverName);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="profile">
        <div className="profile_avatar">
          <img src={userById.avatar_url} alt="avatar" />
          <h1>{userById.username}</h1>
          <div className="profile_avatar_age">Homme de 32 ans</div>
          <span className="profile_avatar_departement">{userById.city}</span>
          <div className="profile_avatar_sendMessage">
            <BiMessage className="profile_avatar_sendMessage_icon" />
            <Link
              name={userById.id}
              to={{
                pathname: '/message',
                state: { conversation: filterConversation },
              }}
              onClick={handleClickMessage}
              className={userById.username}
            >
              Envoyer une message
            </Link>
          </div>
          <button className="profile_avatar_addfriend">Ajouter en ami</button>
        </div>
        <div className="profile_info">
          <img src={banner} alt="banner" />
          <div className="profile_info_bio">{userById.bio}</div>
          <div className="profile_info_explorationParticipate">
            {userById.explorationparticipate
            && userById.explorationparticipate[0] !== null ? (
              <>
                <p>{userById.username}, participe aux explorations suivantes</p>
                <div className="profile_info_explorationParticipate_content">
                  {userById?.explorationparticipate?.map((element) => (
                    <Event key={element?.id} element={element} />
                  ))}
                </div>
              </>
              ) : (
                <p>{userById.username} ne participe à aucune exploration</p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  getUserById: PropTypes.func.isRequired,
  userById: PropTypes.object.isRequired,
  conversations: PropTypes.array.isRequired,
  createConversation: PropTypes.func.isRequired,
  getConversation: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Profile;
