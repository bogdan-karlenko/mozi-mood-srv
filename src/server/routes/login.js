var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;

var router = express.Router();

const saltRounds = 10;
const url = "mongodb://localhost:27017/mozi-mood-srv";

router.get('/', (req, res) => { res.send('login works') });
router.post('/auth', (req, res) => {
  const credentials = req.body;

  MongoClient.connect(url)
    .then(db => {
      let collection = db.collection('users');
      collection.findOne({ name: req.body.username }, { password: 1 })
        .then(user => {
          let isAuthenticated = bcrypt.compareSync(req.body.password, user.password)
          console.log('password OK:', isAuthenticated);
          let token = jwt.sign({ id: user._id }, req.body.password);
          isAuthenticated ? res.json(token) : res.sendStatus(401);
        })
        .catch(err => {
          console.log(err);
        })

      db.close();
    })
    .catch(err => {
      console.log(err);
    })
});

router.post('/', (req, res) => {
  let decoded = jwt.verify(req.body.acess_token, req.body.pwd);
  MongoClient.connect(url)
    .then(db => {
      let collection = db.collection('users');
      console.log('decoded.id: ', decoded.id);
      collection.findOne({ "_id": new ObjectId(decoded.id) }, { password: 0 })
        .then((user) => {
          res.json(user);
        })
        .catch(err => {
          console.log(err);
        });
      db.close();
    })
})

module.exports = router;
