/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import Navbar from 'src/containers/Navbar';
import PropTypes from 'prop-types';
import explorationImg from 'src/assets/img/bg_sky2.png';
import avatar from 'src/assets/img/avatar.png';
import * as dayjs from 'dayjs';
import Loader from 'src/components/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import getIconWeather from 'src/selectors/iconWeather';
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
  getWeather,
  weather,
}) => {
  const [items, setLength] = useState(Array.from({ length: 5 }));
  const [hasmore, setHasmore] = useState(true);

  useEffect(() => {
    getEventData(id);
  }, []);

  useEffect(() => {
    getWeather(eventToModify?.geog);
  }, [eventToModify]);

  if (isEventLoading) {
    return <Loader />;
  }

  const fetchMoreData = () => {
    if (items.length >= 16) {
      setHasmore(false);
      return;
    }
    setTimeout(() => {
      setLength(items.concat(Array.from({ length: 5 })));
    }, 1000);
  };

  const hangleOnchange = (e) => {
    onChange(e.target.value, e.target.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(id);
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const findUserParticipate = eventToModify?.participants?.find(
    (element) => element === user.user.username,
  );

  const handleClickParticipate = () => {
    onClickParticipate(id);
  };

  const handleClickNotParticipate = () => {
    onClickNotParticipate(id);
  };

  if (!weather.weather) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Navbar />
      <div className="participate">
        <div className="participate_content">
          <div className="buttonZone">
            <Link className="button backMap" to="/map">
              <IoIosArrowBack /> Revenir sur la carte
            </Link>
          </div>
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
                <span>Météo :  </span>
                <div className="temp">
                  {getIconWeather(weather.weather[0].icon)}
                  {weather.temp}°{' '}
                </div>
                <div className="weather_info">
                  <span>
                    Vitesse du vent : {Math.round(weather.wind_speed * 3.6)} km/h{' '}
                  </span>
                  <span>Humidité : {weather.humidity} % </span>
                  <span>Nuages : {weather.clouds} %</span>
                </div>
              </div>
            </div>
            <Map coord={eventToModify.geog ? eventToModify.geog : null} />
            <div className="participant">
              <span>
                Nombre d'explorateurs{' '}
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
                <button onClick={handleClickNotParticipate}>
                  Ne plus participer
                </button>
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

              <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasmore}
                loader={<h4>Chargement...</h4>}
                endMessage={' '}
              >
                {eventToModify.comments
                && eventToModify.comments[0].content !== null
                  ? eventToModify.comments
                    ?.filter((item, index) => index < items.length)
                    .map((element) => (
                      <Comment key={element.id} {...element} />
                    ))
                  : ''}
              </InfiniteScroll>
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
  getWeather: PropTypes.func.isRequired,
  weather: PropTypes.object.isRequired,
};

Participate.defaultProps = {
  sendComment: '',
};
