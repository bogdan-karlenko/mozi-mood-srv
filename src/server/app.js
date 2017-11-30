var express = require('express');
var login = require('./routes/login');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var http = require('http');

var app = express();
var server = http.createServer(app);

var socketServer = http.createServer();
var io = socketio(socketServer);
// io.origins('*:*');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/login', login);

const port = 8011;

var server = app.listen(port, () => {
  console.log('----- \n Server is running on port', port, '\n-----');
})

io.on('connection', (socket) => {
  console.log('a user connected', Object.keys(io.sockets.connected));
});
io.on('disconnection', (socket) => {
  console.log('a user disconnected');
});

io.on('mood_event', (msg) => {
  console.log(msg);
})

socketServer.listen(3000, () => {
  console.log('----- \n Socket Server is running on port', 3000, '\n-----');
})
