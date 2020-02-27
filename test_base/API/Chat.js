const express = require('express');
const mongoose = require('mongoose');
const Chat = require('../DBConnection/Chat');
const route = express.Router();

//ALL
route.get('/', function(req, res, next){
	Chat.find(function(err, chat){
		if(err){
			res.send(err);
		}
		res.json(chat);
	});
});

//SPECIFIC
route.get('/:id', function(req, res, next){
  Chat.find({user_id:req.params.id}, function(err, report){
		if(err){
			res.send(err);
		}
		res.json(report);
	});
});

//ADD NEW
route.post('/', async (req, res) => {
  const{user_id, sender, messages, dateTime, viewed} = req.body;
  let chat = {};
  chat.user_id = user_id;
  chat.sender = sender;
  chat.receiver = "Admin"
  chat.messages = messages;
  chat.dateTime = dateTime;
  chat.viewed = false;

  let chatModel = new Chat(chat);
  await chatModel.save();
  res.json(chatModel);
});
  
module.exports = route;