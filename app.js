const express = require('express');
const { getTopics } = require('./controller/topics.contoller');
const { getArticleById, patchArticleById } = require('./controller/articles.controller');
const app = express();

app.use(express.json())

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById)

app.patch('/api/articles/:article_id', patchArticleById)

app.use((err, req, res, next) => {
   if(err.code === '22P02'){
       res.status(400).send({message: 'Bad request'})
   } else { 
       next(err) }
})

app.use((err, req, res, next) => {
    if(err.code === '23502'){
        res.status(400).send({message: 'Bad request'})
    } else { 
        next(err) }
 })

app.use((err, req, res, next) => {
    if(err.status === 404){
        res.status(404).send({msg: 'Not found'})
    } else {
        next(err)
    }
})

app.all('/*', (req, res) => {
    res.status(404).send({msg: 'Not found'})
})
app.use((err, req, res, next) => {
    res.status(500).send('internal server error');
});

module.exports = app;
