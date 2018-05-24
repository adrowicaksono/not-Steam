const port = process.env.PORT || 4000;
const express = require('express');
const app = express()
const session = require('express-session');
const bodyParser = require('body-parser')
let indexGames = require('./routes/routes_games.js')
let indexUser = require('./routes/routes_user.js')
let routesAuthentication = require('./routes/routes_authentication.js')
let steam = require('./routes/notSteam.js')

app.locals.formatUang = require('./helpers/formatCurrency')
app.locals.yetPurchase = require('./helpers/yetPurchase')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('views/home'))
app.use(express.static('views/steam'))

app.use(session({
    secret:'0912uk!&#s82b!@#',
    cookie:{}
}))
//setup ejs
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
	res.render('home/index')
})
app.use('/steam',steam)

app.use('/games', indexGames)
// app.use('/users', indexUser)
app.use('/auth',routesAuthentication)

app.listen(port,console.log('listening on port 3000'))