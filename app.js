const express = require('express');
const { getTopics } = require('./controller/topics.contoller');
const app = express();

app.get('/api/topics', getTopics);

module.exports = app;
