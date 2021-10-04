import React from "react";
import PropTypes from "prop-types";
import * as dayjs from "dayjs";

const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const User = ({ user, onlineUser }) => {
  console.log(onlineUser);

  const isOnline = onlineUser.find((element) => element.userId === user.id);

  console.log(isOnline);
  return (
    <tr>
      <td className="member_pseudo">
        <img src={user.avatar_url} alt="avatar" className="member_avatar" />
        <span className="member_name">{user.username}</span>
      </td>
      <td>{user.city}</td>
      <td>Envoyer un message</td>
      <td>{isOnline ? 'oui' : 'non'}</td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onlineUser: PropTypes.array.isRequired,
};

export default User;
