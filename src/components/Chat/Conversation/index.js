import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Conversation = ({
  conversation, userId,
}) => {
  const [friend, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find(
      (id) => id !== userId.toString(),
    );
    const getUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.defaults.headers.common.authorization = `BEARER ${user?.token}`;
        const res = await axios.get(`http://localhost:3000/user/${friendId}`);
        setUser(res.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userId, conversation]);

  return (
    <div className="conversation">
      <img src={friend?.avatar_url} alt="" className="conversation_avatar" />
      <span>{friend?.username}</span>
    </div>
  );
};

Conversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
};

export default Conversation;
