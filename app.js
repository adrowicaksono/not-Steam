const express = require('express');
const app = express()
const bodyParser = require('body-parser')
let indexGames = require('./routes/routes_games.js')
let indexUser = require('./routes/routes_user.js')
let indexAuthenthication = require('./routes/routes_authentication.js')
 
app.use(bodyParser.urlencoded({extended:false}))

//setup ejs
app.set('view engine', 'ejs');
app.set('views', './views')

app.use('/games', indexGames)
// app.use('/users', indexUser)
app.use('/auth',indexAuthenthication)

app.listen(3000,console.log('listening on port 3000'))