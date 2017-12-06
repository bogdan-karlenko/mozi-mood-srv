const amqp = require('amqplib');
const db = require('./db').logic('mongodb://localhost:27017/mozi-mood-srv');

let logic = () => {

  connect = (name) => {
    return (async() => {
      const conn = await amqp.connect('amqp://jmhthooi:-znoE24Q1Mwql1bwIJznCilsyVn4mmzA@sheep.rmq.cloudamqp.com/jmhthooi');
      console.log('........', name, 'amqp connected to', conn.connection.stream._host);
      return conn;
    })()
  }

  disconnect = (name, connection) => {
    (async() => {
      const conn = await connection;
      conn.close();
      console.log('..X..', name, 'amqp disconnected');
      return;
    })();
  }

  send = (connection, channel, data) => {
    (async() => {
      //const conn = await amqp.connect('amqp://jmhthooi:-znoE24Q1Mwql1bwIJznCilsyVn4mmzA@sheep.rmq.cloudamqp.com/jmhthooi');
      const conn = await connection;
      const ch = await conn.createChannel();
      ch.assertQueue(channel, { durable: false });
      ch.sendToQueue(channel, new Buffer(JSON.stringify(data)))
      console.log("---\n [x] Sent to MQ ", JSON.stringify(data), '\n---')
      return;
    })();
  }

  receive = (connection, channel) => {
    (async() => {
      const conn = await connection;
      //const conn = await amqp.connect('amqp://jmhthooi:-znoE24Q1Mwql1bwIJznCilsyVn4mmzA@sheep.rmq.cloudamqp.com/jmhthooi');
      const ch = await conn.createChannel();
      ch.assertQueue(channel, { durable: false });
      ch.consume(channel, (msg) => {
        data = JSON.parse(msg.content.toString());
        db.writeToDB(data, 'mood');
        console.log('>>>Write to DB completed, data: ', data);
      }, { noAck: true });
    })();
  }

  return {
    connect,
    disconnect,
    send,
    receive,
  }
}

module.exports = { logic };
