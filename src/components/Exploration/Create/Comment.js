import React from "react";
import { TiDelete } from "react-icons/ti";
import * as dayjs from "dayjs";
import PropTypes from "prop-types";

const Comment = ({ element, onClickDelete, idEvent }) => {
  const handleClick = () => {
    onClickDelete(element.id, idEvent);
  };

  return (
    <div className="comments_box">
      <img src={element.avatar_url} alt="explorationImg" className="author_img" />
      <div className="content">
        <div className="test">
          <div className="author">
            <span className="author_name">{element.username}, </span>
            le {dayjs(element.created_at).format("DD/MM/YYYY à HH:mm")}
          </div>
          <div className="delete" onClick={handleClick}>
            <TiDelete className="deleteIcon" />
            Supprimer
          </div>
        </div>
        <p>{element.content}</p>
      </div>
    </div>
  );
};

export default Comment;

Comment.propTypes = {
  element: PropTypes.object.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  idEvent: PropTypes.number.isRequired,
};
