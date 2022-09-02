const express = require('express')
const app = express()
let PORT = 3000
// const { pool } = require('./dbconfig')
// const bcrypt =('bcryptjs');
// require('dotenv').config

const db = require('./models')

// const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')

//scrapers
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(require('./routes/newBlogEntry'))
app.use(require('./routes/index'))
app.use(require('./routes/register'))
app.use(require('./routes/login'))

//!ROUTES


// app.get('/users/login', (req, res) => {
//   res.render('login')
// })

app.get('/dashboard', (req, res) => {
  res.render('dashboard', {user: 'Buster'})
})

app.post('/users/register', async (req,res) =>{
  let {name, email, password, password2} = req.body 
  console.log({
    name,
    email,
    password,
    password2
  })

})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//~VALIDATION CHECKS
//   let errors =[]

//   if (!name || !email || !password || !password2){
//     errors.push({message:"Please enter all fields."})
//   }

//   if (password.length < 6){
//     errors.push({message: "Password should be at least 6 characters long."})
//   }

//   if(password != password2){
//     errors.push({ message: 'Passwords do not match'})
//   }

//   if (errors.length > 0){
//     res.render('register', {errors})
//   }else{
//~    FORM VALIDATION CHECKS HAVE PASSED
//   let hashedPassword = await bcrypt.hashSync(password, 10)
//    console.log(hashedPassword)
//   }
// })

//routes
