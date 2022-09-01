const { errorMonitor } = require('events')
const express = require('express')
const app = express()
const { pool } = require('./dbconfig')
const bcrypt =('bcryptjs');

const PORT = process.env.PORT || 3000


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=> {
  res.render('index')
})

app.get('/users/register', (req, res) => { 
  res.render('register')
})

app.get('/users/login', (req, res) => {
  res.render('login')
})

app.get('/users/dashboard', (req, res) => {
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


//validation checks
  let errors =[]

  if (!name || !email || !password || !password2){
    errors.push({message:"Please enter all fields."})
  }

  if (password.length < 6){
    errors.push({message: "Password should be at least 6 characters long."})
  }

  if(password != password2){
    errors.push({ message: 'Passwords do not match'})
  }

  if (errors.length > 0){
    res.render('register', {errors})
  }else{
    //Form validation has passed

  let hashedPassword = await bcrypt.hashSync(password, 10)
  console.log(hashedPassword)



  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})