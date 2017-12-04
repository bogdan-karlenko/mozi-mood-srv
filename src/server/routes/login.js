const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;

const router = express.Router();

const saltRounds = 10;
const url = "mongodb://localhost:27017/mozi-mood-srv";


router.post('/auth', (req, res) => {
  const credentials = req.body;

  MongoClient.connect(url)
    .then(db => {
      let collection = db.collection('users');
      const secret = 'JWTSecureSecret';
      collection.findOne({ name: req.body.username }, { password: 1 })
        .then(user => {
          if (user) {
            let isAuthenticated = bcrypt.compareSync(req.body.password, user.password)
            console.log('password OK:', isAuthenticated);
            let token = jwt.sign({ id: user._id }, secret);
            isAuthenticated ? res.json(token) : res.status(401).json('Unauthorized');
          } else {
            res.status(401).json('Unauthorized');
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

router.use('/', (req, res, next) => {
  if (req.headers.authorization) {
    const secret = 'JWTSecureSecret';
    const token = JSON.parse(req.headers.authorization).token;
    let decoded = jwt.verify(token, secret)
    req.body = { decoded };
  }
  next();
})

// router.get('/', (req, res) => {
//   let decoded = req.body.decoded;
//   MongoClient.connect(url)
//     .then(db => {
//       let collection = db.collection('users');
//       collection.findOne({ "_id": new ObjectId(decoded.id) }, { password: 0 })
//         .then((user) => {
//           if (user) {
//             res.json(user);
//           } else {
//             res.status(401).json('Unauthorized');
//           }
//         })
//         .catch(err => {
//           console.log(err);
//         });
//       db.close();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
