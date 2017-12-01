const express = require('express');
const login = require('./routes/login');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const socketServer = http.createServer();
const io = socketio(socketServer);

app.use(cors({}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/login', login);

const port = 8011;

app.listen(port, () => {
  console.log('----- \n Server is running on port', port, '\n-----');
})

io.on('connection', (socket) => {
  console.log('a user connected', Object.keys(io.sockets.connected));
  socket.on('mood_event', (msg) => {
    console.log(msg);
  })
});
io.on('disconnection', (socket) => {
  console.log('a user disconnected');
});


socketServer.listen(3000, () => {
  console.log('----- \n Socket Server is running on port', 3000, '\n-----');
})
