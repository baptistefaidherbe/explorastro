/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from "react";
import Navbar from "src/containers/Navbar";
import PropTypes from "prop-types";
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
  saveArrivalMessage,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = user.user;
  const { avatar_url } = user.user;
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = window.io("http://localhost:3000", {
      transports: ["websocket"],
    });

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    socket.current.emit("addUser", id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f)),
      // );
    });
  }, []);
  useEffect(() => {
    if (arrivalMessage) {
      saveArrivalMessage(arrivalMessage);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    getConversation(id);
  }, [id]);

  useEffect(() => {
    getMessage(currentChat?._id);
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOnChange = (e) => {
    onChangeMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = {
      conversationId: currentChat._id,
      sender: id,
      text: newMessage,
      avatar_url: avatar_url,
    };
    const receiverId = currentChat?.members?.find(
      (member) => member !== id.toString()
    );

    socket.current.emit("sendMessage", {
      senderId: id,
      receiverId,
      text: newMessage,
    });
    onSubmitMessage(message);
  };
  return (
    <div className="container">
      <Navbar />
      <div className="chat">
        <div className="chat_search">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {conversations.map((element) => (
            <div key={element._id} onClick={() => setCurrentChat(element)}>
              <Conversation
                conversation={element}
                userId={id}
                getUser={getUser}
              />
            </div>
          ))}
        </div>
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
  saveArrivalMessage: PropTypes.func.isRequired,
};

export default Chat;
