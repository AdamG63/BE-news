const cors = require("cors");
const express = require("express");
const { getApi } = require("./controller/api.controller");
const { getTopics } = require("./controller/topics.contoller");
const {
  getArticleById,
  patchArticleById,
  getArticles,
} = require("./controller/articles.controller");
const { getUsers } = require("./controller/users.controller");
const {
  getCommentsById,
  postComments,
  deleteCommentById,
} = require("./controller/comments.controller");
const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticleById);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsById);

app.post("/api/articles/:article_id/comments", postComments);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.get("/api", getApi);

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ message: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "Not found" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ message: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "Not found" });
  } else {
    next(err);
  }
});

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("internal server error");
});

module.exports = app;
