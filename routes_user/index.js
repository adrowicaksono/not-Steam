const express = require('express');
const router = express.Router();

const model = require('../models');
let Games = model.Game;
let Users = model.User;

const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false}); 

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', function(req, res){
    Users
    .findAll({order: [['id', 'ASC']]})
    .then(function(users){
        res.render('view_users', {
            _users : users, 
        })
    })
})
//sampe sini
router.get('/add', function(req, res){
    res.render('add_users',{
        error : '',
    });
})

router.post('/add', urlencodedParser, function(req, res){
    Users
    .create({
        username : req.body.username,
        age : req.body.age,
        email : req.body.email,
        password : req.body.password,
        salt : req.body.salt,
        role :  req.body.role,
    })
    .then(function(){
        res.redirect('/users')
    })
    .catch(function({ errors }){
        //tambahkan pesan error
        //res.send((err.message).split(', '));
        res.render('add_users', {
            errors
        })
    })
   
})

router.get('/edit/:id', urlencodedParser, function(req,res){
    Users
    .findById(req.params.id)
    .then(function(user){
        res.render('edit_users',{
            _user : user,
        });
    })
})

router.post('/edit/:id', urlencodedParser, function(req, res){
    Users
    .update({
        username : req.body.username,
        age : req.body.age,
        email : req.body.email,
        password : req.body.password,
        salt : req.body.salt,
        role : req.body.role,
        updatedAt: new Date(),
      }, {
        where : {
            id : {
               [Op.eq] : req.params.id,
              }
        }
      })
      .then(function(){
          res.redirect('/users')
      })
      .catch(function(err){
          res.send(err)
      })
})

router.get('/delete/:id', urlencodedParser, function(req, res){
    Users
    .destroy({where:{id:req.params.id}})
    .then(function(){
        res.redirect('/users')
    })
})




module.exports = router;