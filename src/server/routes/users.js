const express = require('express');
const MongoClient = require('mongodb').MongoClient;
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;

const router = express.Router();

//const saltRounds = 10;
const url = "mongodb://localhost:27017/mozi-mood-srv";

router.use('/', (req, res, next) => {
  if (req.headers.authorization) {
    const secret = 'JWTSecureSecret';
    const token = req.headers.authorization.split(/Bearer\s/)[1];
    try {
      let decoded = jwt.verify(token, secret)
      req.body = { decoded };
    } catch (err) {
      console.log('user JWT error: ', err.message)
      res.status(401).end();
    }
  }
  next();
})

router.get('/', (req, res) => {
  let decoded = req.body.decoded;
  MongoClient.connect(url)
    .then(db => {
      let collection = db.collection('users');
      collection.findOne({ "_id": new ObjectId(decoded.id) }, { password: 0 })
        .then((user) => {
          if (user) {
            res.json(user);
          } else {
            res.sendStatus(401);
          }
        })
        .catch(err => {
          console.log(err);
        });
      db.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
