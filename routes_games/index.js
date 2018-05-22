const express = require('express');
const router = express.Router();
const model = require('../models');
let Games = model.Game;
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false}); 

router.get('/', function(req, res){
    Games
    .findAll({order: [['id', 'ASC']]})
    .then(function(games){
        res.render('view_games', {
            _games : games, 
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
        res.send('data tidak lengkap')
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
               [Op.eq] : 23,
              }
        }
      })
      .then(function(){
          res.redirect('/')
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