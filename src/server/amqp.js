const amqp = require('amqplib');
const db = require('./db').logic('mongodb://localhost:27017/mozi-mood-srv');

let logic = () => {

  connect = () => {
    return amqp.connect('amqp://jmhthooi:-znoE24Q1Mwql1bwIJznCilsyVn4mmzA@sheep.rmq.cloudamqp.com/jmhthooi')
      .then((conn) => {
        console.log('amqp connection to', conn.connection.stream._host);
        return Promise.resolve(conn);
      })

  }

  publisher = (connection, channel, data) => {
    if (connection) {
      connection
        .then((conn) => conn.createChannel())
        .then((ch) => {
          ch.assertQueue(channel, { durable: false });
          ch.sendToQueue(channel, new Buffer(JSON.stringify(data)))
        })
        .then(() => console.log("---\n [x] Sent to MQ ", data, '\n---'))
        .catch(err => console.log(err));
    }
  }

  consumer = (connection, channel) => {
    if (connection) {
      return connection
        .then((conn) => conn.createChannel())
        .then((ch) => {
          ch.assertQueue(channel, { durable: false });
          //console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", channel);
          ch.consume(channel, function(msg) {
            data = JSON.parse(msg.content.toString());
            db.writeToDB(data, 'mood');
            console.log('>>>Write to DB completed, data: ', data);
            //Promise.resolve(msg);
            //console.log(" [x] Received %s", msg.content.toString());
          }, { noAck: true });

        })
    }
  }

  return {
    connect: connect,
    publisher: publisher,
    consumer: consumer
  }

}

module.exports = {
  logic: logic
};
