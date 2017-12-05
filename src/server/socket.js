const jwt = require('jsonwebtoken');
const amqp = require('./amqp').logic();

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
      try {
      userID = jwt.verify(token, secret).id
        socketAuth = true;
      } catch(err) {
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
      console.log('a socket user connected', Object.keys(io.sockets.connected));
      let senderConn = amqp.connect();
      socket
        .on('mood_event', (msg) => {
          amqp.publisher(senderConn, 'mood', { user_id: userID, mood: JSON.parse(msg) });
        })
        .on('disconnect', (socket) => {
          console.log('a socket user disconnected');
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


