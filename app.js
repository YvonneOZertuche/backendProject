const express = require('express')
const app = express()
const helmet = require('helmet')
const passport = require('passport')
require('./auth/passport-config')(passport)
const cookieSession = require('cookie-session')
const { pool } = require('./dbconfig')
require('dotenv').config
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.use(helmet())
app.set('view engine', 'ejs')

//SCRAPERS
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//PASSPORT-MIDDLEWARE
// app.use(passport.initialize())
// app.use(passport.session)

//COOKIE SESSION
app.use(cookieSession({
  name: 'session',
  keys: ['abcdeabcdeabcde'],
  maxAge: 14 * 24 * 60 *60 * 1000
}))

//ROUTES
app.use(require('./routes/allBlogsCRUD'))
app.use(require('./routes/index'))
app.use(require('./routes/register'))
app.use(require('./routes/login'))
app.use(require('./routes/dashboard'))
app.use(require('./routes/blogs'))

app.use(express.static('./public'))
app.use(express.static(__dirname + '/public/'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})





