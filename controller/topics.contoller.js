const { response } = require('express');
const { fetchTopics } = require('../model/topics.model');


exports.getTopics = (req, res) => {
    fetchTopics().then((topics) => {
        res.status(200).send({topics})
    })
    .catch((err) => {
        next(err);
    })
}