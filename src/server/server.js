const express = require('express')
const app = express()
const port = 8011;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('----- \n Server is running on port', port, '\n-----'));
