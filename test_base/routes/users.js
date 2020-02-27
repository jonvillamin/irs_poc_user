var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/reporter', ['tbl_user']);

//GET ALL
router.get('/users', function(req, res, next){
	db.tbl_user.find(function(err, users){
		if(err){
			res.send(err);
		}
		res.json(users);
	});
});

//GET ONE by id
router.get('/user/:id', function(req, res, next){
	// console.log('In get router!!!');
	db.tbl_user.find({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
		if(err){
			res.send(err);
		}
		res.json(user);
	});
});

//SAVE
router.post('/user', function(req, res, next){
	var user = req.body;
	if(!user.user_type || !user.user_name || !user.user_password || !user.user_firstname || !user.user_lastname || !user.user_grp){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.tbl_user.save(user, function(err, user){
			if(err){
				res.send(err);
			}
			res.json(user);
		})
	}
});

//DELETE
router.delete('/user/:id', function(req, res, next){
	db.tbl_user.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
		if(err){
			res.send(err);
		}
		res.json(user);
	});
});

//UPDATE
router.put('/user/:id', function(req, res, next){
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
		db.tbl_user.update({_id: mongojs.ObjectId(req.params.id)}, {$set:updUser}, function(err, user){
			if(err){
				res.send(err);
			}
			res.json(user);
		});
	}
});

module.exports = router;

//OLD VERSION
// router.put('/user/:id', function(req, res, next){
// 	var user = req.body;
// 	var updUser = {};

// 	if(user.selection){
// 		updUser.user_value = user.selection;
// 	}

// 	if(!updUser){
// 		res.status(400);
// 		res.json({
// 			"error": "Bad Data"
// 		});
// 	} else {
// 		console.log('UpdUser.user_value contains ' + updUser.user_value);
// 		db.tbl_user.update({_id: mongojs.ObjectId(req.params.id)}, {$set:updUser}, function(err, user){
// 			if(err){
// 				res.send(err);
// 			}
// 			res.json(user);
// 		});
// 	}
// });

// module.exports = router;