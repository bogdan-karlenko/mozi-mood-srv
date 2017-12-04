const MongoClient = require('mongodb').MongoClient;

let logic = function(url) {

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

  clearCollection = (collection) => {
    MongoClient.connect(url)
      .then(db => {
        db.collection(collection).remove();
        db.close();
        return;
      })
      .catch(err => {
        console.log(err);
      })
  }

  return {
    writeToDB: writeToDB,
    clearCollection: clearCollection
  }
}

module.exports = {
  logic: logic
};
