import React, { useEffect } from 'react';
import Navbar from 'src/containers/Navbar';
import PropTypes from 'prop-types';
import User from './User';

const Member = ({
  getAllUser, allUser, onlineUser, createConversation, conversations, getConversation,
}) => {
  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="member">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Pseudo</th>
              <th>Pseudo</th>
              <th>Connecté</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((element) => (
              <User
                key={element.id}
                user={element}
                onlineUser={onlineUser}
                createConversation={createConversation}
                conversations={conversations}
                getConversation={getConversation}

              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Member.propTypes = {
  getAllUser: PropTypes.func.isRequired,
  allUser: PropTypes.array.isRequired,
  onlineUser: PropTypes.array.isRequired,
  createConversation: PropTypes.func.isRequired,
  conversations: PropTypes.array.isRequired,
  getConversation: PropTypes.func.isRequired,
};

export default Member;
