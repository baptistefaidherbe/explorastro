/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import Navbar from 'src/containers/Navbar';
import PropTypes from 'prop-types';
import explorationImg from 'src/assets/img/bg_sky2.png';
import avatar from 'src/assets/img/avatar.png';
import * as dayjs from 'dayjs';
import Loader from 'src/components/Loader';
import Map from './Map';
import Comment from './Comment';
import Participant from './Participant';

const Participate = ({
  id,
  getEventData,
  eventToModify,
  onChange,
  onSubmit,
  sendComment,
  onClickParticipate,
  isEventLoading,
  onClickNotParticipate,
}) => {
  useEffect(() => {
    getEventData(id);
  }, []);

  const hangleOnchange = (e) => {
    onChange(e.target.value, e.target.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(id);
  };

  const user = JSON.parse(localStorage.getItem('user'));

  if (isEventLoading) {
    return <Loader />;
  }

  const findUserParticipate = eventToModify?.participants?.find(
    (element) => element === user.user.username,
  );

  const handleClickParticipate = () => {
    onClickParticipate(id);
  };

  const handleClickNotParticipate = () => {
    onClickNotParticipate(id);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="participate">
        <div className="participate_content">
          <div className="banner">
            <img
              src={
                eventToModify.image_url
                  ? eventToModify.image_url
                  : explorationImg
              }
              alt="explorationImg"
              className="imgBanner"
            />
            <div className="author">
              <img src={avatar} alt="imgAvatar" className="imgAvatar" />
              <span>Organisateur : {eventToModify.username} </span>
            </div>
          </div>
          <div className="info">
            <div className="name">
              <h1>{eventToModify.name}</h1>
            </div>
            <div className="description">
              <span>{eventToModify.description}</span>
            </div>
            <div className="grp">
              <div className="date">
                <span>
                  Date de l'exploration :{' '}
                  {dayjs(eventToModify.date).format('DD-MM-YYYY à HH:mm')}
                </span>
              </div>
              <div className="weather">
                <span>Météo : soleil</span>
              </div>
            </div>
            <Map coord={eventToModify.geog ? eventToModify.geog : null} />
            <div className="participant">
              <span>
                Nombre de participants{' '}
                {eventToModify.participants
                && eventToModify.participants[0] !== null
                  ? eventToModify.participants?.length
                  : 0}
                /{eventToModify.max_participants}
              </span>
              <div className="participant_member">
                {eventToModify.participants
                && eventToModify.participants[0] !== null
                  ? eventToModify.participants?.map((element) => (
                    <Participant key={element} username={element} />
                  ))
                  : ''}
              </div>

              {!findUserParticipate ? (
                <button onClick={handleClickParticipate}>Participer</button>
              ) : (
                <button onClick={handleClickNotParticipate}>Ne plus participer</button>
              )}
            </div>
            <div className="comments">
              <span>Commentaires : </span>
              <form onSubmit={handleSubmit} className="comments_send">
                <input
                  type="text"
                  className="comments_send_input"
                  onChange={hangleOnchange}
                  name="sendComment"
                  placeholder="Saisir votre commentaire"
                  value={sendComment}
                />
                <button className="comments_send_btn">Envoyer</button>
              </form>
              {eventToModify.comments
              && eventToModify.comments[0].content !== null
                ? eventToModify.comments?.map((element) => (
                  <Comment key={element.id} {...element} />
                ))
                : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participate;

Participate.propTypes = {
  id: PropTypes.number.isRequired,
  getEventData: PropTypes.func.isRequired,
  eventToModify: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  sendComment: PropTypes.string,
  onClickParticipate: PropTypes.func.isRequired,
  isEventLoading: PropTypes.bool.isRequired,
  onClickNotParticipate: PropTypes.func.isRequired,
};

Participate.defaultProps = {
  sendComment: '',
};
