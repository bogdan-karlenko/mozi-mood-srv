var express = require('express');
var login = require('./routes/login');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketio(server);
io.origins('*:*');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/login', login);

const port = 8011;

server.listen(port, () => {
  console.log('----- \n Server is running on port', port, '\n-----');
})

// var server = app.listen(port, () => {
//   console.log('----- \n Server is running on port', port, '\n-----');
// })

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('mood_event', (msg) => {
  console.log(msg);
})
