const express = require('express');
const mongoose = require('mongoose');
const Tally = require('../DBConnection/Freq');
const route = express.Router();

route.get('/', function(req, res, next){
	Tally.find(function(err, tally){
		if(err){
			res.send(err);
		}
		res.json(tally);
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

route.post('/', async (req, res) => {
    const{user_grp,assault, sh, bullying, selfHarm, drugUse, hateSpeech, 
        iths, harassment, theft, verbalAbuse} = req.body;
    let tally = {};
    tally.user_grp = user_grp;
    tally.assault = assault;
    tally.sh = sh;
    tally.bullying = bullying;
    tally.selfHarm = selfHarm;
    tally.drugUse = drugUse;
    tally.hateSpeech = hateSpeech;
    tally.iths = iths;
    tally.harassment = harassment;
    tally.theft = theft;
    tally.verbalAbuse = verbalAbuse;
    let tallyModel = new Tally(tally);
    await tallyModel.save();
    res.json(tallyModel);
  });
  
  module.exports = route;