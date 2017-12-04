const express = require('express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

const http = require('http');
const cors = require('cors');
const mySocket = require('./socket');


const httpPort = 8011;
const socketPort = 3000;

const login = require('./routes/login');
const users = require('./routes/users');

const app = express();

const socketServer = http.createServer();
const io = socketio(socketServer);

app.use(cors({}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/login', login);
app.use('/users', users);

const url = "mongodb://localhost:27017/mozi-mood-srv";
const myDB = require('./db').logic(url);

mySocket.logic(io);

socketServer.listen(socketPort, () => {
  console.log('----- \n Socket Server is running on port', socketPort, '\n-----');
  myDB.clearCollection('mood');
})

app.listen(httpPort, () => {
  console.log('----- \n Server is running on port', httpPort, '\n-----');
})
