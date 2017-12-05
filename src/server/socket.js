const jwt = require('jsonwebtoken');

let logic = function (io) {

const url = "mongodb://localhost:27017/mozi-mood-srv";
const myDB = require('./db').logic(url);


let socketAuth = false;
let userID;

  io.use((socket, next) => {
    const secret = 'JWTSecureSecret';
    const token = JSON.parse(socket.handshake.query.token);
    //console.log('socket token', token);
    if (token) {
      if (userID = jwt.verify(token, secret).id) {
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
          myDB.writeToDB({ user_id: userID, mood: JSON.parse(msg) },
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


