const express = require('express')
const app = express()
let PORT = 3000
// const { pool } = require('./dbconfig')

// require('dotenv').config



// const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')

//scrapers
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//ROUTES
app.use(require('./routes/newBlogEntry'))
app.use(require('./routes/index'))
app.use(require('./routes/register'))
app.use(require('./routes/login'))
app.use(require('./routes/dashboard'))


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


