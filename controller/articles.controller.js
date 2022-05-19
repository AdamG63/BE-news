const {
  selectArticleById,
  updateArticleById,
  fetchArticles,
} = require("../model/articles.model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => res.status(200).send({ article }))
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const updateBody = req.body;
  updateArticleById(article_id, updateBody)
    .then((article) => res.status(200).send({ article }))
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const sortBy = req.query.sort_by;
  const order = req.query.order_by;

  fetchArticles(sortBy, order)
    .then((articles) => res.status(200).send({ articles }))
    .catch(next);
};
