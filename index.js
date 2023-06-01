const express = require('express');
const port = process.env.PORT || 5000;
const app = express();

app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.send(express.static('dist/index.html'));
})

app.listen(port, function() {
  console.log('Server is running.');
});