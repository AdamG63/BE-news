const { fetchCommentsById } = require("../model/comments.model");

exports.getCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsById(article_id)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch(next);
};
