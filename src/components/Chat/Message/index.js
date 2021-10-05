import React from 'react';
import PropTypes from 'prop-types';
import * as dayjs from 'dayjs';

const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

const Message = ({ message, own }) => (
  <div className={own ? 'message own' : 'message'}>
    {/* <img src={sender?.avatar_url} alt="" /> */}
    <div className="messageTop">
      <p className={own ? 'messageBox messageBox-own' : 'messageBox'}>{message.text}</p>
    </div>
    <div className="date">
      <span>{dayjs(message.createdAt).fromNow()}</span>
    </div>
  </div>
);

Message.propTypes = {
  message: PropTypes.object.isRequired,
  own: PropTypes.bool.isRequired,
};

export default Message;
