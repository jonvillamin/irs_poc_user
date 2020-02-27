const express = require('express');
const mongoose = require('mongoose');
const User = require('../DBConnection/User');
const route = express.Router();

route.get('/users', function(req, res, next){
	User.find(function(err, uses){
		if(err){
			res.send(err);
		}
		res.json(uses);
	});
});

//GET ONE by id
route.get('/user/:id', function(req, res, next){
	User.find({_id: mongoose.Types.ObjectId(req.params.id)}, function(err, user){
		if(err){
			res.send(err);
		}
		res.json(user);
	});
});

//count all users except admin
route.get('/usersAll', function(req, res, next){
	User.countDocuments({"user_type":1},function(err, uses){
		if(err){
			res.send(err);
		}
		res.json(uses);
	});
});

route.post('/', async (req, res) => {
    const{user_name,user_password, user_grp, user_firstname, user_lastname, user_type} = req.body;
    let user = {};
    user.user_name = user_name;
    user.user_password = user_password;
    user.user_grp = user_grp;
    user.user_firstname = user_firstname;
    user.user_lastname = user_lastname;
    user.user_type = user_type;
    let userModel = new User(user);
    await userModel.save();
    res.json(userModel);
  });

//UPDATE
route.put('/user/:id', function(req, res, next){
	var user = req.body;
	var updUser = {};

	if(user.user_password){
		updUser.user_password = user.user_password;
	}

	if(user.user_firstname){
		updUser.user_firstname = user.user_firstname;
	}

	if(user.user_lastname){
		updUser.user_lastname = user.user_lastname;
	}

	if(user.user_grp){
		updUser.user_grp = user.user_grp;
	}

	if(!updUser){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		User.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {$set:updUser}, function(err, user){
			if(err){
				res.send(err);
			}
			res.json(user);
		});
	}
});
  
  module.exports = route;