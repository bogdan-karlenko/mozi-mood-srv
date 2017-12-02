// TODO
const jwt = require('jsonwebtoken');

var logic = function (io) {
  console.log('we are in socket.js file');

let socketAuth = false;

  io.use((socket, next) => {
    const secret = 'JWTSecureSecret';
    const token = JSON.parse(socket.handshake.query.token);
    if (token) {
      if (jwt.verify(token, secret)) {
        socketAuth = true;
      } else {
        console.log('jwt error');
        socket.disconnect();
      }
    } else {
      console.log('no token');
      socket.disconnect();
    }
    next();
  })

  io.on('connection', (socket) => {
    if (socketAuth) {
      console.log('a user connected', Object.keys(io.sockets.connected));
      socket
        .on('mood_event', (msg) => {
          writeToDB({ mood: JSON.parse(msg) },
            'mood');
          console.log(JSON.parse(msg));
        })
        .on('disconnect', (socket) => {
          console.log('a user disconnected');
        });
    } else {
      console.log('SocketUser is not authorised');
      socket.disconnect();
    }
  });
};

module.exports = {
  logic: logic
};


