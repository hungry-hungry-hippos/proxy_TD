const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('http-proxy-middleware');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

app.use('/:id', express.static(path.join(__dirname, 'public')));

app.use('/restaurants/:id', proxy({target: 'http://ec2-3-92-226-206.compute-1.amazonaws.com/'}));
app.use('/articles/:id', proxy({target: 'http://ec2-3-92-226-206.compute-1.amazonaws.com/'}));
app.use('/reviews/:id', proxy({target: 'http://ec2-3-92-226-206.compute-1.amazonaws.com/'}));
app.use('/api/:id', proxy({target: 'http://ec2-54-67-103-109.us-west-1.compute.amazonaws.com/'}));
