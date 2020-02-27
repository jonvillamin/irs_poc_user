const express = require('express');
const mongoose = require('mongoose');
multer = require('multer');
const IncidentRecord = require('../DBConnection/IncidentRecord');
const route = express.Router();

route.get('/incidentRecords', function(req, res, next){
	IncidentRecord.find(function(err, incidentRecord){
		if(err){
			res.send(err);
		}
		res.json(incidentRecord);
	});
});

//GET MY REPORTS
route.get('/record/:id', function(req, res, next){
	var mySort = { record_date: -1};
	IncidentRecord.find({incident_complainant_id:req.params.id, incident_status:{$not:/Deleted/}}).sort(mySort).exec(function(err, report){
		if(err){
			res.send(err);
		}
		res.json(report);
	});
});

//count all records
route.get('/incidentRecordsAll', function(req, res, next){
	IncidentRecord.countDocuments(function(err, incidentRecord){
		if(err){
			res.send(err);
		}
		res.json(incidentRecord);
	});
});

//COUNT SPECIFIC USER REPORTS
route.get('/record/all/:id', function(req, res, next){
	IncidentRecord.find({incident_complainant_id:req.params.id, incident_status:{$not:/Deleted/}}).countDocuments(function(err, report){
		if(err){
			res.send(err);
		}
		res.json(report);
	});
});

//count all pending status
route.get('/incidentRecordsPending', function(req, res, next){
	IncidentRecord.countDocuments({"incident_status": "Pending"}, function(err, incidentRecord){
		if(err){
			res.send(err);
		}
		res.json(incidentRecord);
	});
});

//COUNT SPECIFIC USER PENDING REPORTS
route.get('/record/pending/:id', function(req, res, next){
	IncidentRecord.find({incident_complainant_id:req.params.id, incident_status:"Pending"}).countDocuments(function(err, report){
		if(err){
			res.send(err);
		}
		res.json(report);
	});
});

//COUNT SPECIFIC USER PENDING REPORTS
route.get('/record/verified/:id', function(req, res, next){
	IncidentRecord.find({incident_complainant_id:req.params.id, incident_status:"Verified"}).countDocuments(function(err, report){
		if(err){
			res.send(err);
		}
		res.json(report);
	});
});

//COUNT SPECIFIC USER PENDING REPORTS
route.get('/record/rejected/:id', function(req, res, next){
	IncidentRecord.find({incident_complainant_id:req.params.id, incident_status:"Rejected"}).countDocuments(function(err, report){
		if(err){
			res.send(err);
		}
		res.json(report);
	});
});

//COUNT SPECIFIC USER COMPLETED REPORTS
route.get('/record/completed/:id', function(req, res, next){
	IncidentRecord.find({incident_complainant_id:req.params.id, incident_status:"Completed"}).countDocuments(function(err, report){
		if(err){
			res.send(err);
		}
		res.json(report);
	});
});

//count all records today
route.get('/incidentRecordsToday', function(req, res, next){
    var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
	IncidentRecord.countDocuments({record_date:{"$lte":new Date().toLocaleDateString("en-US", options)}}, function(err, incidentRecord){
		if(err){
			res.send(err);
		}
		res.json(incidentRecord);
	});
});

route.post('/', async (req, res) => {
	const{record_no,incident_type, incident_who, incident_when, incident_comments,
        incident_attachment, incident_complainant_id, incident_status, record_date,
        anonymous, displayed} = req.body;
    let incidentRecord = {};
    incidentRecord.record_no = record_no;
    incidentRecord.incident_type = incident_type;
    incidentRecord.incident_who = incident_who;
    incidentRecord.incident_when = incident_when;
    incidentRecord.incident_comments = incident_comments;
    incidentRecord.incident_attachment = incident_attachment;
    incidentRecord.incident_complainant_id = incident_complainant_id;
    incidentRecord.incident_status = incident_status;
    incidentRecord.record_date = record_date;
	incidentRecord.anonymous = anonymous;
	incidentRecord.displayed = displayed;
    let incidentRecordModel = new IncidentRecord(incidentRecord);
    await incidentRecordModel.save();
    res.json(incidentRecordModel);
  });

  //update
route.put('/incidentRecord/:id', function(req, res, next){
	var incidentRecord = req.body;
	var updIncidentRecord = {};

	if(incidentRecord.incident_status){
		updIncidentRecord.incident_status = incidentRecord.incident_status;
	}

	if(!updIncidentRecord){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		IncidentRecord.updateOne({_id:mongoose.Types.ObjectId(req.params.id)}, {$set:updIncidentRecord}, function(err, incidentRecord){
			if(err){ 
				res.send(err);
			}
			res.json(incidentRecord); 
		});
	}
});

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
    }
  });
  
  var upload = multer({
    storage: storage,
    // limits: {
    //   fileSize: 1024  1024  5
    // },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });

  
  
  route.get("/", (req, res, next) => {
    File.find().then(data => {
      res.status(200).json({
        message: "User list retrieved successfully!",
        users: data
      });
    });
  });
  
  module.exports = route;