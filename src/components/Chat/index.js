/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from "react";
import Navbar from "src/containers/Navbar";
import PropTypes from "prop-types";
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import Conversation from "./Conversation";
import Message from "./Message";

const Chat = ({
  getConversation,
  conversations,
  getUser,
  getMessage,
  messages,
  onChangeMessage,
  newMessage,
  onSubmitMessage,
  onlineUser,
  toggleFriend,
  isToggleFriend,
  onchangeFriend,
  searchFriend,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id, username } = user.user;
  const { avatar_url } = user.user;
  const [currentChat, setCurrentChat] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const data = useLocation();
  const conversationId = data?.state?.conversation?._id;
  console.log(onlineUser.userId);
  const handleToggleFriend = () => {
    toggleFriend();
  };

  const filterFriends = conversations.filter((element) =>
    element.members[2]?.includes(searchFriend)
  );

  useEffect(() => {
    socket.current = window.io("http://localhost:3000", {
      transports: ["websocket"],
    });
  }, []);

  useEffect(() => {
    getConversation(id);
  }, [id]);

  useEffect(() => {
    getMessage(currentChat?._id);
  }, [currentChat]);

  useEffect(() => {
    setCurrentChat(data?.state?.conversation);
  }, [conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOnChange = (e) => {
    onChangeMessage(e.target.value);
  };

  const handleOnchangeFriend = (e) => {
    onchangeFriend(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const receiverId = currentChat?.members?.find(
      (member) => member !== id.toString()
    );

    const message = {
      conversationId: currentChat._id,
      sender: id,
      text: newMessage,
      avatar_url: avatar_url,
      username: username,
      receiverId: receiverId,
    };

    socket.current.emit("sendMessage", {
      username: username,
      senderId: id,
      receiverId,
      text: newMessage,
    });

    const onlineREceiver = onlineUser.find((element) => element.userId !== id);
    onSubmitMessage(message, onlineREceiver);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="chat">
        {currentChat ? (
          <div className="chat_messages">
            <div className="messages">
              {messages.map((element) => (
                <div key={element._id} ref={scrollRef}>
                  <Message
                    message={element}
                    own={element.sender === id.toString()}
                  />
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="chat_messages_input">
              <textarea
                className="textArea"
                placeholder="write something..."
                onChange={handleOnChange}
                value={newMessage}
              />
              <button className="buttunMessage">Send</button>
            </form>
          </div>
        ) : (
          <div className="isEmpty"> </div>
        )}
        <div className={isToggleFriend ? "chat_friend" : "chat_friend_closed"}>
          <input
            placeholder="Search for friends"
            className="chatMenuInput"
            onChange={handleOnchangeFriend}
          />
          {filterFriends.length !== 0
            ? filterFriends.map((element) => (
                <div key={element._id} onClick={() => setCurrentChat(element)}>
                  <Conversation
                    conversation={element}
                    userId={id}
                    getUser={getUser}
                    onlineUser={onlineUser}
                  />
                </div>
              ))
            : ""}
          <BsArrowBarRight
            className="iconToggleClosedFriend"
            onClick={handleToggleFriend}
          />
        </div>
        {!isToggleFriend ? (
          <BsArrowBarLeft
            className="iconToggleOpenFriend"
            onClick={handleToggleFriend}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

Chat.propTypes = {
  getConversation: PropTypes.func.isRequired,
  conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUser: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  onChangeMessage: PropTypes.func.isRequired,
  newMessage: PropTypes.string.isRequired,
  onSubmitMessage: PropTypes.func.isRequired,
  onlineUser: PropTypes.array.isRequired,
  toggleFriend: PropTypes.func.isRequired,
  isToggleFriend: PropTypes.bool.isRequired,
  onchangeFriend: PropTypes.func.isRequired,
  searchFriend: PropTypes.string.isRequired,
};

export default Chat;
