var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/reporter', ['tbl_dept']);

//GET ALL
router.get('/depts', function(req, res, next){
	db.tbl_dept.find(function(err, depts){
		if(err){
			res.send(err);
		}
		res.json(depts);
	});
});

module.exports = router;