const jwt = require('jsonwebtoken');
const amqp = require('./amqp').logic();

let logic = function(io) {

  const url = "mongodb://localhost:27017/mozi-mood-srv";
  const myDB = require('./db').logic(url);

  const EventEmitter = require('events').EventEmitter;

  var status = new EventEmitter;

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
      } catch (err) {
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
      //console.log('a socket user connected', Object.keys(io.sockets.connected));
      status.emit('connected', 'a socket user connected. id: ' + socket.id);
      let senderConn = amqp.connect('sender');
      socket
        .on('mood_event', (msg) => {
          amqp.send(senderConn, 'mood', { user_id: userID, mood: JSON.parse(msg) });
        })
        .on('disconnect', (socket) => {
          console.log('a socket user disconnected', Object.keys(io.sockets.connected));
          amqp.disconnect('sender', senderConn);
          if (Object.keys(io.sockets.connected).length === 0) {
            status.emit('all_disconnected', 'All socket users have been disconnected');
          }
        });
    } else {
      console.log('SocketUser is not authorised');
      socket.disconnect();
    }
  });

  return { status }
};

module.exports = { logic };
