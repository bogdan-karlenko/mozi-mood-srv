const jwt = require('jsonwebtoken');
const amqp = require('./amqp').logic();

let logic = function(io) {

  const url = "mongodb://localhost:27017/mozi-mood-srv";
  const myDB = require('./db').logic(url);

  const EventEmitter = require('events').EventEmitter;

  var status = new EventEmitter;

  let socketAuth = false;
  let users = {socket: 'user'};

  io.use((socket, next) => {
    const secret = 'JWTSecureSecret';
    const token = socket.handshake.query.token.split(/Bearer\s/)[1];
    if (token) {
      try {
        const user = jwt.verify(token, secret).id;
        users[socket.id] = user;
        socketAuth = true;
      } catch (err) {
        console.log('jwt error: ', err.message);
        socket.emit('Unauthorized', 'jwt error:'+err.message);
      }
    } else {
      console.log('no token');
      socket.disconnect();
    }
    next();
  })

  io.on('connection', (socket) => {
    if (socketAuth) {
      status.emit('connected', 'a socket user connected. id: ' + socket.id);
      let senderConn = amqp.connect('sender');
      socket
        .on('mood_event', (msg) => {
          amqp.send(senderConn, 'mood', { user_id: users[socket.id], mood: JSON.parse(msg) });
        })
        .on('disconnect', () => {
          console.log('a socket user disconnected. id:', socket.id);
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
