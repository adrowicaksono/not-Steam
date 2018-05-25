const express = require('express');
const app = express()
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const model = require('../models')
const User = model.User
const Game = model.Game
const Transaction = model.Transaction

app.use(express.static('views/steam'))

router.get('/',(req,res)=>{
	Game.findAll()
	.then((games)=>{
		Game.getByGenre()
		.then((genre)=>{
			res.render('steam/index',{games,genre})
		})
	})
})


router.get('/profile',function(req,res,next){
	if (!req.session.current_user) {
		res.render('login', {errors:{message:"lihat profile, login dahulu"}})
	}
	else{
		next()
	}
},(req,res)=>{
	if (req.session.current_user) {
		Transaction.findAll({
			include : {
				model: Game,
			},where : {
				"UserId" : req.session.current_user.id
			}
		})
		.then((games)=>{
			// res.send(games)
			res.render('profile',{games})
		})
	}
	else if (!req.session.current_user) {
		res.redirect('/auth')
	}
})
router.post('/', function(req,res){
    var filter = req.body.genre;
    Game
    .findAll({
        where:{
            genre : filter
        }
    })
    .then(function(games){
        Game
        .getByGenre()
        .then(function(genre){
            res.render('steam/index',{
                games,
                genre,
            })
        })
       
    })
})
router.get('/profile/:games_Id',function(req,res,next){
	if(!req.session.current_user){
		res.render('login', {errors:{message:'login dahulu'}})
	}else{
		next()
	}
},(req,res)=>{
	Transaction.findAll({
		include: {
			model: User,
		},where : {
			'GameId' : req.params.games_Id 
		}
	})
	.then(games=>{
		res.render('view_who_played',{games})
	})
})
router.post('/buy/:gamesId/',function(req,res,next){
	if(!req.session.current_user){
		res.render('login', {errors:{message : "harus login dahulu" }})
	}
		else{
			next()
	}
}, function(req, res){
    let User_Id = req.session.current_user.id
    let games_Id = req.params.gamesId;
    // console.log(User_Id,'user id',games_Id,'games_Id')
    Transaction
    .create({
        UserId : User_Id,
        GameId : games_Id,
    })
    .then(function(games){
       res.redirect('/steam')
    })
    .catch(function(err){
        res.send(err);
    })
})
module.exports = router