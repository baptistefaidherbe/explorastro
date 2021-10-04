import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

const User = ({
  user,
  onlineUser,
  createConversation,
  conversations,
  getConversation,
}) => {
  const isOnline = onlineUser.find((element) => element.userId === user.id);
  const sender = JSON.parse(localStorage.getItem('user'));
  const { id } = sender.user;

  useEffect(() => {
    getConversation(id);
  }, [id]);

  const handleClickMessage = (e) => {
    const receiver = e.target.name;
    const filterConversation = conversations.find(
      (element) => element.members[1] === receiver || element.members[0] === receiver,
    );
    if (!filterConversation) {
      createConversation(id, user.id);
    }
  };
  return (
    <tr>
      <td className="member_pseudo">
        <img src={user.avatar_url} alt="avatar" className="member_avatar" />
        <span className="member_name">{user.username}</span>
      </td>
      <td>{user.city}</td>
      <td>
        <Link
          name={user.id}
          to="/message"
          className="logoutLink"
          onClick={handleClickMessage}
        >
          Envoyer une message
        </Link>
      </td>
      <td>{isOnline ? 'oui' : 'non'}</td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onlineUser: PropTypes.array.isRequired,
  createConversation: PropTypes.func.isRequired,
  conversations: PropTypes.array.isRequired,
  getConversation: PropTypes.func.isRequired,
};

export default User;
