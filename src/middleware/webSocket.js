import { WS_CONNECT } from 'src/actions/webSocket';

let socket;

const websocket = (store) => (next) => (action) => {
  switch (action.type) {
    case WS_CONNECT: {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const pseudo = user.user.username;
        socket = window.io('http://localhost:3000', {
          transports: ['websocket'],
        });
        socket.emit('pseudo', pseudo);

        socket.on('newUser', (message) => {
          console.log(message);
        });

        socket.on('quitUser', (message) => {
          console.log(message);
        });
      }
      break;
    }
    default:
      next(action);
  }
};

export default websocket;
