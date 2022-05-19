const db = require("../db/connection");
const { checkExists } = require("../db/helpers/utils");
exports.fetchCommentsById = (article_id) => {
  const promise1 = db.query("SELECT * FROM comments WHERE article_id = $1", [
    article_id,
  ]);
  const promise2 = checkExists("articles", "article_id", article_id);
  return Promise.all([promise1, promise2]).then(([comments, article]) => {
    if (article) {
      return comments.rows;
    }
  });
};
