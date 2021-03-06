const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics").then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "Not found",
      });
    }
    return result.rows;
  });
};

exports.fetchSlugs = () => {
  return db.query("SELECT slug FROM topics").then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "Not found",
      });
    }
    return result.rows;
  });
};
