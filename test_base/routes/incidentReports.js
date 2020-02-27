var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var multer = require('multer');

var DIR = './uploads/';
var upload = multer({dest: DIR}).single('incident_attachment');

var db = mongojs('mongodb://127.0.0.1:27017/reporter', ['tbl_incidentRecord']);

//GET ALL REPORTS
router.get('/reports', function(req, res, next){
	db.tbl_incidentRecord.find(function(err, reports){
		if(err){
			res.send(err);
		}
		res.json(reports);
	});
});

//GET MY REPORTS
router.get('/report/:id', function(req, res, next){
	db.tbl_incidentRecord.find({incident_complainant_id:req.params.id}, function(err, report){
		if(err){
			res.send(err);
		}
		res.json(report);
	});
});

//FILE NEW REPORT
router.post('/report', function(req, res, next){
	var report = req.body;
	if(!report.incident_type || !report.incident_when || !report.incident_complainant_id || !report.incident_status || !report.record_date){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.tbl_incidentRecord.save(report, function(err, report){
			if(err){
				res.send(err);
			}
			res.json(report);
		})
	}
});

//COUNT MY REPORTS
router.get('/report/all/:id', function(req, res, next){
	db.tbl_incidentRecord.find({incident_complainant_id:req.params.id}).count(function(err, report){
		if(err){
			res.send(err);
		}
		res.json(report);
	});
});

//COUNT MY PENDING REPORTS
router.get('/report/pending/:id', function(req, res, next){
	db.tbl_incidentRecord.find({incident_complainant_id:req.params.id, incident_status:"Pending"}).count(function(err, report){
		if(err){
			res.send(err);
		}
		res.json(report);
	});
});

//COUNT MY COMPLETED REPORTS
router.get('/report/completed/:id', function(req, res, next){
	db.tbl_incidentRecord.find({incident_complainant_id:req.params.id, incident_status:"Completed"}).count(function(err, report){
		if(err){
			res.send(err);
		}
		res.json(report);
	});
});

//our file upload function.
router.post('/', function (req, res, next) {
	var path = '';
	upload(req, res, function (err) {
	   if (err) {
		 // An error occurred when uploading
		 console.log(err);
		 return res.status(422).send("an Error occured")
	   }  
	  // No error occured.
	   path = req.file.path;
	   return res.send("Upload Completed for "+path); 
 });     
})

module.exports = router;