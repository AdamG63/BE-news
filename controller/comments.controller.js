const {
  fetchCommentsById,
  insertComment,
  removeCommentbyId,
} = require("../model/comments.model");

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
  const updateBody = req.body;
  insertComment(article_id, updateBody)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentbyId(comment_id)
    .then((comment) => {
      res.sendStatus(204);
    })
    .catch(next);
};
