/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from "react";
import Navbar from "src/containers/Navbar";
import Loader from "src/components/Loader";
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
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = user.user;
  const { avatar_url } = user.user;
  const [currentChat, setCurrentChat] = useState(null);
  const scrollRef = useRef();

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
                <div ref={scrollRef}>
                  <Message
                    key={element._id}
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
};

export default Chat;
