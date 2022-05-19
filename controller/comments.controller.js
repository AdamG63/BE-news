const { fetchCommentsById, insertComment } = require("../model/comments.model");

exports.getCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsById(article_id)
    .then((comment) => {
      res.status(200).send(comment);
    })
    .catch(next);
};

exports.postComments = (req, res, next) => {
  const { article_id } = req.params;
  console.log(article_id);
  const updateBody = req.body;
  insertComment(article_id, updateBody)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
