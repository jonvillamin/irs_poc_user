const express = require('express');
const mongoose = require('mongoose');
const Logs = require('../DBConnection/Logs');
const route = express.Router();

route.get('/', function(req, res, next){
	Logs.find(function(err, logs){
		if(err){
			res.send(err);
		}
		res.json(logs);
	});
});

// route.get('/uses', (req, res) => {
//     const{name,password} = req.body;
//     let user = {};
//     user.name = name;
//     user.password = password;
//     let userModel = new User.find();
//     res.json(userModel);
//   });

//GET ALL with id
route.get('/myLogs/:id', function(req, res, next){
  var mySort = { action_date: -1};
	Logs.find({user_id:req.params.id}).sort(mySort).exec(function(err, log){
		if(err){
			res.send(err);
		}
		res.json(log);
	});
});

//GET USER NOTIFS
route.get('/myLogs/notif/:id', function(req, res, next){
  var mySort = { action_date: -1};
	Logs.find({$and: [ { $or : [ { action_id: 7 }, { action_id: 8 } ] }, {action_removed: false}, {user_id:req.params.id}]}).sort(mySort).exec(function(err, log){
		if(err){
			res.send(err);
		}
		res.json(log);
	});
});

//COUNT UNVIEWED USER NOTIFS
route.get('/myLogs/notif/unviewed/:id', function(req, res, next){
	Logs.countDocuments({$and: [ { $or : [ { action_id: 7 }, { action_id: 8 } ] }, { action_viewed: false }, { action_removed:false }, {user_id:req.params.id}]}, function(err, log){
		if(err){
			res.send(err);
		}
		res.json(log);
	});
});

route.post('/', async (req, res) => {
    const{user_id,user_name, action_id, action_name, action_date, action_viewed, action_removed} = req.body;
    let log = {};
    log.user_id = user_id;
    log.user_name = user_name;
    log.action_id = action_id;
    log.action_name = action_name;
    log.action_date = action_date;
    log.action_viewed = action_viewed;
    log.action_removed = action_removed;
    let logModel = new Logs(log);
    await logModel.save();
    res.json(logModel);
  });

  //UPDATE
  route.put('/myLog/:id', function(req, res, next){
    var log = req.body;
    var updLog = {};

    if(log.action_viewed){
      updLog.action_viewed = log.action_viewed;
    }

    if(log.action_removed){
      updLog.action_removed = log.action_removed;
    }

    if(!updLog){
      res.status(400);
      res.json({
        "error": "Bad Data"
      });
    } else {
      Logs.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {$set:updLog}, function(err, log){
        if(err){
          res.send(err);
        }
        res.json(log);
      });
    }
  });
  
  module.exports = route;