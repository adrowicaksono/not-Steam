const express = require('express');
const app = express()
let indexGames = require('./routes_games')
let indexUser = require('./routes_user')
app.locals.toRupiah = require('./helper/toRupiah.js')
//setup ejs
app.set('view engine', 'ejs');
app.set('views', './views')

app.use('/games', indexGames)
app.use('/users', indexUser)

app.listen(3000)