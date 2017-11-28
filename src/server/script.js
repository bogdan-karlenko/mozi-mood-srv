const users = [{
    name: 'Bill',
    age: 32,
    sex: 'Male'
  },
  {
    name: 'Mary',
    age: 24,
    sex: 'Female'
  },
  {
    name: 'Jake',
    age: 40,
    sex: 'Male'
  },
  {
    name: 'Sarah',
    age: 19,
    sex: 'Female'
  }
];

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mozi-mood-srv"

MongoClient.connect(url)
  .then(db => {
    let collection = db.collection('users');
    collection.remove({});
    users.forEach(user => {
        collection.insert(user);
        })
    console.log('users successfully added');
    db.close();
  })
  .catch(err => {
    console.log(err);
  })
