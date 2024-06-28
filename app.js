const express = require("express");
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4200;

const myReqLogger = require('./Utilities/requestLogger');
const router = require('./routes/routing');

app.use(cors());
app.use(bodyparser.json());
app.use(myReqLogger);
app.use('/', router);

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});