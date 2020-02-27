var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/tally', ['freq']);

//GET ALL
router.get('/freqs', function(req, res, next){
	db.freq.find(function(err, freqs){
		if(err){
			res.send(err);
		}
		res.json(freqs);
	});
});

//UPDATE
router.put('/freq', function(req, res, next){
	var freq = req.body;
	var updFreq = {};

	if(freq._1A){
		updFreq._1A = freq._1A;
	}
	else if(freq._1B){
		updFreq._1B = freq._1B;
	}
	else if(freq._1C){
		updFreq._1C = freq._1C;
	}
	else if(freq._2A){
		updFreq._2A = freq._2A;
	}
	else if(freq._2B){
		updFreq._2B = freq._2B;
	}
	else if(freq._2C){
		updFreq._2C = freq._2C;
	}
	else if(freq._3A){
		updFreq._3A = freq._3A;
	}
	else if(freq._3B){
		updFreq._3B = freq._3B;
	}
	else if(freq._3C){
		updFreq._3C = freq._3C;
	}
	else if(freq.guestA){
		updFreq.guestA = freq.guestA;
	}
	else if(freq.guestB){
		updFreq.guestB = freq.guestB;
	}
	else if(freq.guestC){
		updFreq.guestC = freq.guestC;
	}

	if(!updFreq){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		console.log(updFreq);
		db.freq.update({}, {$set:updFreq}, function(err, freq){
			if(err){
				res.send(err);
			}
			res.json(freq);
		});
	}
});

module.exports = router;