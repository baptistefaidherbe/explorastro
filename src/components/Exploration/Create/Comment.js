import React from "react";
import explorationImg from "src/assets/img/bg_sky2.png";
import { TiDelete } from "react-icons/ti";

const Comment = () => (
  <div className="comments_box">
    <img src={explorationImg} alt="explorationImg" className="author_img" />
    <div className="content">
      <div className="test">
        <div className="author">
          <span className="author_name">toto, </span>
          le 24/09/2021
        </div>
        <div className="delete">
          <TiDelete className="deleteIcon" />
          Supprimer
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quam
        aspernatur ullam libero sed praesentium minima eveniet natus dolorem
        illo harum, commodi voluptatem soluta, nesciunt provident autem
        voluptatibus iure incidunt.
      </p>
    </div>
  </div>
);

export default Comment;
