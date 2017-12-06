const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;
const url = require('url');

const router = express.Router();

const saltRounds = 10;
const urlDB = "mongodb://localhost:27017/mozi-mood-srv";

router.use('/', (req, res, next) => {
  const params = url.parse(req.url, true).query;
  if (req.headers.authorization) {
    const secret = 'JWTSecureSecret';
    const token = req.headers.authorization.split(/Bearer\s/)[1];
    try {
      let decoded = jwt.verify(token, secret);
      if (params.ValidityCheck) {
        res.status(200).send('{}'); //prevent bodyParser error
      }
    } catch (err) {
      res.status(401).send('JWT err ' + err.message);
      console.log('JWT err', err.message);
    } finally {
      if (!params.ValidityCheck) {
        req.body = { decoded };
      }
    }
  }
  next();
})

router.get('/', (req, res, next) => {});

router.post('/', (req, res, next) => {
  const credentials = req.body;

  MongoClient.connect(urlDB)
    .then(db => {
      let collection = db.collection('users');
      const secret = 'JWTSecureSecret';
      collection.findOne({ name: req.body.username }, { password: 1 })
        .then(user => {
          if (user) {
            let isAuthenticated = bcrypt.compareSync(req.body.password, user.password)
            console.log('password OK:', isAuthenticated);
            let token = jwt.sign({ id: user._id }, secret);
            isAuthenticated ?
              res.json(token) :
              res.status(401).send('Wrong username/password') //wrong pass
          } else {
            res.status(401).send('Wrong username/password'); //no such user
          }
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

module.exports = router;
