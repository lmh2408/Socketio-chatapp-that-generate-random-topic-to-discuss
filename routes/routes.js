var express = require('express');
var router = express.Router();

var indexRoute = require('../routes/index.js')

router.route('/')
  .get(indexRoute.get);


module.exports = router;
