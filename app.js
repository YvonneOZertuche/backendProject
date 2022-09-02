const express = require('express')
const app = express()
const passport = require('passport');

// const cookieSession = require('cookie-session');
// let PORT = 3000
// const { pool } = require('./dbconfig')

// require('dotenv').config



const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')

//scrapers
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//passport
// app.use(passport.initialize())
// app.use(passport.session)

//cookieSession
// app.use(cookieSession({
//   name: 'session',
//   key: ['abcdeabcdeabcde'],
//   maxAge: 14 * 24 * 60 *60 * 1000
// }))

//ROUTES
app.use(require('./routes/newBlogEntry'))
app.use(require('./routes/index'))
app.use(require('./routes/register'))
app.use(require('./routes/login'))
app.use(require('./routes/dashboard'))
app.use(require('./routes/blogs'))


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})





