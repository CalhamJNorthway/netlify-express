'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
app.get('/results', (req, res) => {
  console.log("GET RESULTS")
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write('<h1>Sending Results</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
app.use('/results', (req, res) => res.sendFile(path.join(__dirname, './similarityResults.json')))

module.exports = app;
module.exports.handler = serverless(app);
