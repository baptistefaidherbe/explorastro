import React from 'react';

const getIconWeather = (weather) => {
  let icon;
  switch (weather) {
    case '01d':
      icon = <img src="http://openweathermap.org/img/wn/01d.png" alt="weather" />;
      break;
    case '02d':
      icon = <img src="http://openweathermap.org/img/wn/02d.png" alt="weather" />;
      break;
    case '03d':
      icon = <img src="http://openweathermap.org/img/wn/03d.png" alt="weather" />;
      break;
    case '04d':
      icon = <img src="http://openweathermap.org/img/wn/04d.png" alt="weather" />;
      break;
    case '09d':
      icon = <img src="http://openweathermap.org/img/wn/05d.png" alt="weather" />;
      break;
    case '10d':
      icon = <img src="http://openweathermap.org/img/wn/06d.png" alt="weather" />;
      break;
    case '11d':
      icon = <img src="http://openweathermap.org/img/wn/07d.png" alt="weather" />;
      break;
    case '13d':
      icon = <img src="http://openweathermap.org/img/wn/08d.png" alt="weather" />;
      break;
    case '50d':
      icon = <img src="http://openweathermap.org/img/wn/09d.png" alt="weather" />;
      break;
    default:
      console.log('Sorry, we are out of');
  }
  return icon;
};

export default getIconWeather;
