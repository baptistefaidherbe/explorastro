import React from 'react';
import explorationImg from 'src/assets/img/bg_sky2.png';
import { TiDelete } from 'react-icons/ti';
import * as dayjs from 'dayjs';
import PropTypes from 'prop-types';

const Comment = ({ element }) => (
  <div className="comments_box">
    <img src={explorationImg} alt="explorationImg" className="author_img" />
    <div className="content">
      <div className="test">
        <div className="author">
          <span className="author_name">{element.username}, </span>
          le {dayjs(element.created_at).format('DD/MM/YYYY à HH:mm')}
        </div>
        <div className="delete">
          <TiDelete className="deleteIcon" />
          Supprimer
        </div>
      </div>
      <p>{element.content}</p>
    </div>
  </div>
);

export default Comment;

Comment.propTypes = {
  element: PropTypes.object.isRequired,
};
