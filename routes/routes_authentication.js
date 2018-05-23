const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const model = require('../models')
const User = model.User
// const crypto = require('crypto')
// const bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({extended:false})
let bcrypt = require('bcrypt')

router.get('/',function(req,res){
	res.send('auth')
})
router.get('/register',function(req,res){
	res.render('register')
})
router.post('/register',function(req,res){
	// console.log(req.body)
	let salt = bcrypt.genSaltSync(8)
	let hash = bcrypt.hashSync(req.body.password,salt) 
	
	User.create({
		username: req.body.username,
		age: req.body.age,
		email: req.body.email,
		password: hash,
		salt: salt
	})
	.then(()=>{
		res.redirect('/auth/login')
	})
	.catch(err=>{
		res.render('register',{msg:'used'})
	})
})

module.exports = router