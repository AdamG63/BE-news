const { request } = require("../app");
const db = require("../db/connection");
const { readFile } = require("fs/promises");

exports.fetchApi = () => {
  return readFile("./endpoints.json", "utf-8").then((result) => {
    const parseResult = JSON.parse(result);
    return parseResult;
  });
};
