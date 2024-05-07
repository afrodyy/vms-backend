const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes");
const errHandler = require("./middleware/errHandler");
const port = 3000;

app.use(bodyParser.json());
app.use("/", router);
app.use(errHandler);

app.listen(port, () => {
  console.log("App listening on port: " + port);
});
