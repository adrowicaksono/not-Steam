const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const model = require('../models')
const User = model.User
// const crypto = requireer.urlencoded({extended:false})
let bcrypt = require('bcrypt')

router.get('/',function(req,res,next){
	if (req.session.current_user) {
		res.send('sudah login')
	}
	else{
		next()
	}
},(req,res,next)=>{
	res.render('login',{msg:''})
})

router.post('/',(req,res,next)=>{
	var salt = bcrypt.genSaltSync(8);
	var hash = bcrypt.hashSync(req.body.password,salt)
	var passTemp = req.body.password
	// let password = bcrypt.compareSync(req.body.password,hash)
    User.findOne({
    	where: {
    		username: req.body.username
    	}
    })
    .then(user=>{
    	if (user) {
    		let password = bcrypt.compareSync(passTemp,user.password)
    		if (password) {
    			if (user.role==='admin') {
		    		req.session.current_user = user
		    		next()
		    		res.redirect('/games')
    			}
    			else{
	    			req.session.current_user = user
	    			next()
	    			res.redirect('/')
    			}
    		}
    	}
    	else{
    		res.redirect('/')
    		console.log('password salah')
    	}
    }).catch(err=>{
    	console.log(err)
    })
})




router.get('/register',function(req,res,next){
	if (req.session.current_user) {
		res.send('sedang login')
	}
	else{
		next()
	}
},function(req,res){
	res.render('register')
})
router.post('/register',function(req,res){
	User.create({
		username: req.body.username,
		age: req.body.age,
		email: req.body.email,
		password: req.body.password,
	})
	.then(()=>{
		// console.log('------------->ctrl1' )
		res.redirect('/auth')
	})
	.catch(err=>{
		console.log('------------->ctrl2', err )
		res.render('register',{err})
	})
})

router.post('/logout', (req, res, next) => {
    req.session.current_user = null
    res.redirect('/auth')
})



module.exports = router