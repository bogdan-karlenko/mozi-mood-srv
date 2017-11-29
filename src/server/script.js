const users = [{
    name: 'Bill',
    age: 32,
    sex: 'Male',
    password: 'bill_pwd'
  },
  {
    name: 'Mary',
    age: 24,
    sex: 'Female',
    password: 'mary_pwd'
  },
  {
    name: 'Jake',
    age: 40,
    sex: 'Male',
    password: 'jake_pwd'
  },
  {
    name: 'Sarah',
    age: 19,
    sex: 'Female',
    password: 'sarah_pwd'
  }
];

var MongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');

const saltRounds = 10;
const url = "mongodb://localhost:27017/mozi-mood-srv";

users.forEach(user => {
  let hash = bcrypt.hashSync(user.password, saltRounds);
  user.password = hash;
  console.log(user.password);
})

MongoClient.connect(url)
  .then(db => {
    let collection = db.collection('users');
    collection.remove({});
    collection.insertMany(users);

    console.log('users successfully added');
    db.close();
  })
  .catch(err => {
    console.log(err);
  })
