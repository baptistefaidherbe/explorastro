import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FaCircle } from "react-icons/fa";

const Conversation = ({ conversation, userId, onlineUser }) => {
  const [friend, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find(
      (id) => id !== userId.toString(),
    );
    const getUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        axios.defaults.headers.common.authorization = `BEARER ${user?.token}`;
        const res = await axios.get(`http://localhost:3000/user/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userId, conversation]);
  const isOnline = onlineUser.find(
    (element) => element.userId === parseInt(conversation.members[1], 10)
  );

  return (
    <div className="conversation">
      <div className="conversation_avatar">
        <img src={friend?.avatar_url} alt="" className="conversation_avatar_img" />
        {isOnline ? (
          <FaCircle className="green" />
        ) : (
          <FaCircle className="red" />
        )}
      </div>
      <span>{friend?.username}</span>
    </div>
  );
};

Conversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  onlineUser: PropTypes.array.isRequired,
};

export default Conversation;
