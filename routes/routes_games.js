const express = require('express');
const router = express.Router();
const model = require('../models');
let Games = model.Game;
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false}); 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', function(req,res,next){
    if(!req.session.current_user){
        res.render('login',{errors: {message: 'Login untuk akses database'}})
    }
    else if(req.session.current_user.role !== 'admin'){
        res.render('login', {errors:{message: 'bukan admin'}})
    }
    else{
        next()
    }
},function(req, res){
    Games
    .findAll({order: [['id', 'ASC']]})
    .then(function(games){
        Games
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
    Games
    .findAll({
        where:{
            genre : filter
        }
    })
    .then(function(games){
        Games
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
router.post('/logout', (req, res, next) => {
    req.session.current_user = null
    res.redirect('/auth')
})

router.get('/sort',(req,res)=>{
    if (req.query.id==='asc') {
        Games.findAll({
            order: [['id','ASC']]
        })
        .then(games=>{
            Games
            .getByGenre()
            .then(function(genre){
                res.render('view_games', {
                    games,
                    genre, 
                })
                
            })
        })
    }
    else if (req.query.id==='desc') {
            Games.findAll({
                order: [['id','DESC']]
            })
            .then(games=>{
                Games
                .getByGenre()
                .then(function(genre){
                    res.render('view_games', {
                        games,
                        genre, 
                    })
                    
                }) 
            })
        }
    else if (req.query.title==='asc') {
        Games.findAll({
            order: [['title','ASC']]
        })
        .then(games=>{
            Games
            .getByGenre()
            .then(function(genre){
                res.render('view_games', {
                    games,
                    genre, 
                })
                
            }) 
        })
    }
    else if (req.query.title==='desc') {
            Games.findAll({
                order: [['title','DESC']]
            })
            .then(games=>{
                Games
                .getByGenre()
                .then(function(genre){
                    res.render('view_games', {
                        games,
                        genre, 
                    })
                    
                }) 
            })
    }
    else if (req.query.genre==='asc') {
            Games.findAll({
                order: [['genre','ASC']]
            })
            .then(games=>{
                Games
                .getByGenre()
                .then(function(genre){
                    res.render('view_games', {
                        games,
                        genre, 
                    })
                    
                }) 
            })
    }
    else if (req.query.genre==='desc') {
            Games.findAll({
                order: [['genre','DESC']]
            })
            .then(games=>{
                Games
                .getByGenre()
                .then(function(genre){
                    res.render('view_games', {
                        games,
                        genre, 
                    })
                    
                }) 
            })
    }
    else if (req.query.price==='asc') {
            Games.findAll({
                order: [['price','ASC']]
            })
            .then(games=>{
                Games
                .getByGenre()
                .then(function(genre){
                    res.render('view_games', {
                        games,
                        genre, 
                    })
                    
                }) 
            })
    }
    else if (req.query.price==='desc') {
            Games.findAll({
                order: [['price','DESC']]
            })
            .then(games=>{
                Games
                .getByGenre()
                .then(function(genre){
                    res.render('view_games', {
                        games,
                        genre, 
                    })
                    
                }) 
            })
    }
     else if (req.query.total_purchase==='asc') {
            Games.findAll({
                order: [['total_purchase','ASC']]
            })
            .then(games=>{
                Games
                .getByGenre()
                .then(function(genre){
                    res.render('view_games', {
                        games,
                        genre, 
                    })
                    
                }) 
            })
    }
    else if (req.query.total_purchase==='desc') {
            Games.findAll({
                order: [['total_purchase','DESC']]
            })
            .then(games=>{
                Games
                .getByGenre()
                .then(function(genre){
                    res.render('view_games', {
                        games,
                        genre, 
                    })
                    
                }) 
            })
    }

})




module.exports = router;