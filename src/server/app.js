var express = require('express');
var login = require('./routes/login');
var bodyParser = require('body-parser');

var app = express();

app.get('/', (req, res) => {res.send('main')});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/login', login);

const port = 8011;

app.listen(port, () => console.log('----- \n Server is running on port', port, '\n-----'));
