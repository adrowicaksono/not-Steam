const express = require('express');
const router = express.Router();
const model = require('../models');
let Game = model.Game;
let Transaction = model.Transaction;
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false}); 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', function(req, res){
    Game
    .findAll({order: [['id', 'ASC']]})
    .then(function(games){
        Game
        .getByGenre()
        .then(function(genre){
            res.render('view_games', {
                games,
                genre, 
            })
            
        })
    })
})

router.post('/filter', urlencodedParser, function(req,res){
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
            res.render('view_games',{
                games,
                genre,
            })
        })
       
    })
})
router.get('/add', function(req, res){
    res.render('add_games');
})

router.post('/add', urlencodedParser, function(req, res){
   
    Game
    .create({
        title : req.body.title,
        genre : req.body.genre,
        price : req.body.price,
    })
    .then(function(){
        res.redirect('/games')
    })
    .catch(function(err){
        res.send(err)
    })
   
})

router.get('/edit/:id', urlencodedParser, function(req,res){
    Game
    .findById(req.params.id)
    .then(function(games){
        res.render('edit_games',{
            _games : games,
        });
    })
})

router.post('/edit/:id', urlencodedParser, function(req, res){
    Game
    .update({
        title : req.body.title,
        genre : req.body.genre,
        price : req.body.price,
        updatedAt: new Date(),
      }, {
        where : {
            id : {
               [Op.eq] : req.params.id,
              }
        }
      })
      .then(function(){
          res.redirect('/games')
      })
      .catch(function(err){
          res.send(err)
      })
})

router.get('/delete/:id', urlencodedParser, function(req, res){
   
    Game
    .destroy({where:{id:req.params.id}})
    .then(function(){
        res.redirect('/games')
    })
})

router.get('/buy/:id', urlencodedParser, function(req, res){
    Game
    .findOne({
        where : {
            id : req.params.id,
        }
    })
    .then(function(gameInfo){
        res.render('buy_games', {gameInfo, userId : 2})
    })

})

router.post('/buy/gamesId/:gamesId/UserId/:userId', function(req, res){
    let User_Id = req.params.userId;
    let games_Id = req.params.gamesId;
    Transaction
    .create({
        UserId : User_Id,
        GameId : games_Id,
    })
    .then(function(games){
       res.redirect('/games')
    })
    .catch(function(err){
        res.send(err);
    })
})



module.exports = router;