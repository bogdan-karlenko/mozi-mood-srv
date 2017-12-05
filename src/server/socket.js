const jwt = require('jsonwebtoken');

let logic = function (io) {

const url = "mongodb://localhost:27017/mozi-mood-srv";
const myDB = require('./db').logic(url);


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
          myDB.writeToDB({ mood: JSON.parse(msg) },
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


