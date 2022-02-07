/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import Navbar from 'src/containers/Navbar';
import PropTypes from 'prop-types';
// import { AiOutlineFileImage } from "react-icons/ai";
import { BiMessage } from 'react-icons/bi';
import banner from 'src/assets/img/bg_sky2.png';
import { useHistory } from 'react-router-dom';
import Event from './Event';

const Profile = ({
  getUserById,
  userById,
  conversations,
  createConversation,
  id,
  getConversation,
}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const senderId = user.user.id;
  const history = useHistory();

  useEffect(() => {
    getUserById(id);
    getConversation(senderId);
  }, []);
  const handleClickMessage = () => {
    const filterConversation = conversations.find(
      (element) => element.members[1] === userById.id.toString()
        || element.members[0] === userById.id.toString(),
    );

    if (!filterConversation) {
      createConversation(senderId, userById.id, userById.username);
    }
    else {
      history.push({
        pathname: '/message',
        state: { conversation: filterConversation },
      });
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
          <div
            className="profile_avatar_sendMessage"
            onClick={handleClickMessage}
          >
            <BiMessage className="profile_avatar_sendMessage_icon" />
            Envoyer une message
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
  id: PropTypes.number.isRequired,
  getConversation: PropTypes.func.isRequired,
};

export default Profile;
