import React, { useEffect } from 'react';
import Navbar from 'src/containers/Navbar';
import PropTypes from 'prop-types';
import User from './User';

const Member = ({
  getAllUser, allUser, onlineUser,
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
              <th>Depatement</th>
              <th>Connecté</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((element) => (
              <User
                key={element.id}
                user={element}
                onlineUser={onlineUser}
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
};

export default Member;
