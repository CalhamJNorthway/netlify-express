'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

app.use(cors);
router.use(cors);
router.get('/', (req, res) => {
  console.log("GET RESULTS")
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.sendFile(path.join(__dirname, '../similarityResults.json'));
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../similarityResults.json')))

module.exports = app;
module.exports.handler = serverless(app);
