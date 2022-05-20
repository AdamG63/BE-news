const db = require("../db/connection");
const { sort } = require("../db/data/test-data");

exports.selectArticleById = (article_id) => {
  return db
    .query(
      "SELECT articles.*, COUNT(comments.comment_id) ::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id",
      [article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
      return rows[0];
    });
};

exports.updateArticleById = (article_id, updateBody) => {
  const { inc_votes } = updateBody;
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
      return rows[0];
    });
};

exports.fetchArticles = (sortBy = "created_at", order = "DESC", topic) => {
  let queryStr = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, COUNT(comments.comment_id) ::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id`;
  const sortByGreenList = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
  ];
  const topicGreenList = '["mitch", "cats", "paper"]';
  const orderGreenList = ["DESC", "ASC"];
  const paramsVal = [];

  if (isNaN(topic) === false) {
    return Promise.reject({ status: 400, message: "Bad request" });
  }
  if (topic !== undefined) {
    if (topicGreenList.includes(topic)) {
      queryStr += ` WHERE articles.topic = $1`;
      paramsVal.push(topic);
    } else {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
  }
  if (sortByGreenList.includes(sortBy)) {
    queryStr += ` GROUP BY articles.article_id ORDER BY ${sortBy}`;
  } else {
    return Promise.reject({ status: 400, message: "Bad request" });
  }

  if (orderGreenList.includes(order.toUpperCase())) {
    queryStr += ` ${order.toUpperCase()}`;
  } else {
    return Promise.reject({ status: 400, message: "Bad request" });
  }

  return db.query(queryStr, paramsVal).then((result) => {
    return result.rows;
  });
};
