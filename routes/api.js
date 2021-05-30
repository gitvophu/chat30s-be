var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next){
    console.log('apiiii');
    res.send('API');
});
module.exports = router;