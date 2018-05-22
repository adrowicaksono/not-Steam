const express = require('express');
const app = express()
let indexGames = require('./routes_games')

//setup ejs
app.set('view engine', 'ejs');
app.set('views', './views')

app.use('/games', indexGames)


app.listen(3000)