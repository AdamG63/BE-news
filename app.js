const express = require('express');
const { getTopics } = require('./controller/topics.contoller');
const app = express();

app.get('/api/topics', getTopics);


app.all('/*', (req, res) => {
    res.status(404).send({msg: 'Not found'})
})
app.use((err, req, res, next) => {
    res.status(500).send('internal server error');
});



module.exports = app;
