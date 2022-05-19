const express = require("express");
const { getTopics } = require("./controller/topics.contoller");
const {
  getArticleById,
  patchArticleById,
  getArticles,
} = require("./controller/articles.controller");
const { getUsers } = require("./controller/users.controller");
const { getCommentsById } = require("./controller/comments.controller");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticleById);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsById);

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ message: "Bad request" });
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
  res.status(500).send("internal server error");
});

module.exports = app;
