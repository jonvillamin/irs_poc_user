var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/reporter', ['tbl_logs']);

//GET ALL
router.get('/logs', function(req, res, next){
	db.tbl_logs.find(function(err, logs){
		if(err){
			res.send(err);
		}
		res.json(logs);
	});
});

//GET ONE by id
router.get('/log/:id', function(req, res, next){
	db.tbl_logs.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, log){
		if(err){
			res.send(err);
		}
		res.json(log);
	});
});

// router.get('/report/completed/:id', function(req, res, next){
// 	db.tbl_incidentRecord.find({incident_complainant_id:req.params.id, incident_status:"Completed"}).count(function(err, report){
// 		if(err){
// 			res.send(err);
// 		}
// 		res.json(report);
// 	});
// });

//GET ALL with id
router.get('/myLogs/:id', function(req, res, next){
	console.log(req.params.id);
	db.tbl_logs.find({user_id:req.params.id}, function(err, log){
		if(err){
			res.send(err);
		}
		res.json(log);
	});
});

//SAVE
router.post('/log', function(req, res, next){
	var log = req.body;
	if(!log.user_name || !log.action_id || !log.action_name || !log.action_date){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.tbl_logs.save(log, function(err, log){
			if(err){
				res.send(err);
			}
			res.json(log);
		})
	}
});

module.exports = router;