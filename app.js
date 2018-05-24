const express = require('express');
const app = express()
const session = require('express-session');
const bodyParser = require('body-parser')
let indexGames = require('./routes/routes_games.js')
let indexUser = require('./routes/routes_user.js')
let routesAuthentication = require('./routes/routes_authentication.js')

app.use(bodyParser.urlencoded({extended:false}))

app.use(session({
    secret:'0912uk!&#s82b!@#',
    cookie:{}
}))
//setup ejs
app.set('view engine', 'ejs');
// app.set('views', './views')
// app.get('/',(req,res)=>{
// 	res.redirect('/auth')
// })
app.use('/games', indexGames)
// app.use('/users', indexUser)
app.use('/auth',routesAuthentication)

app.listen(3000,console.log('listening on port 3000'))