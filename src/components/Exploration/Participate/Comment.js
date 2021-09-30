/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import * as dayjs from 'dayjs';

const Comment = ({
  username, content, avatar_url, created_at,
}) => (
  <div className="comment">
    <img src={avatar_url} alt="avatar" className="comment_avatar" />
    <div className="comment_content">
      <div className="comment_content_username">
        <span className="comment_content_username_login">{username}</span>
        <span className="comment_content_username_date">
          le {dayjs(created_at).format('DD-MM-YYYY à HH:mm')}
        </span>
      </div>
      <p>{content}</p>
    </div>
  </div>
);

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  avatar_url: PropTypes.string,
  created_at: PropTypes.string.isRequired,
};

Comment.defaultProps = {
  avatar_url: 'http://localhost:3000/uploads/avatar.png',
};

export default Comment;
