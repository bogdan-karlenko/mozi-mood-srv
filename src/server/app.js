const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const login = require('./routes/login');

const app = express();
//const server = http.createServer(app);

const socketServer = http.createServer();
const io = socketio(socketServer);

app.use(cors({}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/login', login);

const url = "mongodb://localhost:27017/mozi-mood-srv";
const port = 8011;

writeToDB = (data, collection) => {
  MongoClient.connect(url)
    .then(db => {
      db.collection(collection).insert(data);
      db.close();
    })
    .catch(err => {
      console.log(err);
    })
}

clearCollectionDB = (collection) => {
  MongoClient.connect(url)
    .then(db => {
      db.collection(collection).remove();
      db.close();
    })
    .catch(err => {
      console.log(err);
    })
}

io.on('connection', (socket) => {
  console.log('a user connected', Object.keys(io.sockets.connected));
  socket.on('mood_event', (msg) => {
    writeToDB({ mood: JSON.parse(msg) },
      'mood');
    console.log(JSON.parse(msg));
  })
  socket.on('disconnect', (socket) => {
    console.log('a user disconnected');
  });
});

socketServer.listen(3000, () => {
  console.log('----- \n Socket Server is running on port', 3000, '\n-----');
  clearCollectionDB('mood');
})

app.listen(port, () => {
  console.log('----- \n Server is running on port', port, '\n-----');
})
