const express = require("express");
const app = express();
const router = require("express").Router();
const port = 3000;

app.use(router);

app.listen(port, () => {
  console.log("App listening on port: " + port);
});
