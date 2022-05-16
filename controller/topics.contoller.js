const { response } = require('express');
const { fetchTopics } = require('../model/topics.model');


exports.getTopics = (req, res) => {
    fetchTopics().then((topics) => {
        console.log(topics, 'in the controller')
        res.status(200).send({topics})
    })
}