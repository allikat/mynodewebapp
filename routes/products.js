const express = require('express');
let router = express.Router();

router.get('/', function(req,res){
    res.render('products', {title: 'Products Page'});
});

module.exports = router;