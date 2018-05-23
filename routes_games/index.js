const express = require('express');
const router = express.Router();
const model = require('../models');
let Games = model.Game;
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false}); 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', function(req, res){
    Games
    .findAll({order: [['id', 'ASC']]})
    .then(function(games){
        Games
        .findAll({
            attributes : ['genre'],
            group:'genre',
        })
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
    Games
    .findAll({
        where:{
            genre : filter
        }
    })
    .then(function(games){
        Games
        .findAll({
            attributes : ['genre'],
            group : 'genre',
        })
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
   
    Games
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
    Games
    .findById(req.params.id)
    .then(function(games){
        res.render('edit_games',{
            _games : games,
        });
    })
})

router.post('/edit/:id', urlencodedParser, function(req, res){
    Games
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
   
    Games
    .destroy({where:{id:req.params.id}})
    .then(function(){
        res.redirect('/games')
    })
})






module.exports = router;