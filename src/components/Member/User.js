import React from "react";
import PropTypes from "prop-types";
import * as dayjs from "dayjs";
import { FaCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const User = ({ user, onlineUser }) => {
  const isOnline = onlineUser.find((element) => element.userId === user.id);
  const history = useHistory();
  return (
    <tr
      className="member_row"
      onClick={() => {
        history.push(`/profil/${user.id}`);
      }}
    >
      <td className="member_pseudo">
        <img src={user.avatar_url} alt="avatar" className="member_avatar" />
        <span className="member_name">{user.username}</span>
      </td>
      <td>{user.city}</td>
      <td>
        {isOnline ? (
          <FaCircle className="green" />
        ) : (
          <FaCircle className="red" />
        )}
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onlineUser: PropTypes.array.isRequired,
};

export default User;
