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

exports.insertComment = (article_id, updateBody) => {
  const { body, username } = updateBody;
  return db
    .query(
      "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *",
      [body, username, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeCommentbyId = async (id) => {
  const noComment = await db.query(
    "SELECT * FROM comments WHERE comment_id = $1;",
    [id]
  );
  if (noComment.rows.length === 0) {
    return Promise.reject();
  }

  const deleted = await db.query(
    `DELETE FROM comments WHERE comment_id = $1;`,
    [id]
  );
  return deleted;
};
