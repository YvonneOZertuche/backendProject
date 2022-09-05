const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const db = require('../models')

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    let { name, email, password, password2 } = req.body
     console.log({
    name,
    email,
    password,
    password2
  })

  //validation checks
    let errors = []

    if (!name || !email || !password || !password2) {
      errors.push({ message: 'Please enter all fields.' })
    }

    // if (password.length < 6) {
    //   errors.push({ message: 'Password should be at least 6 characters long.' })
    // }

    if (password != password2) {
      errors.push({ message: 'Passwords do not match' })
    }

    if (errors.length > 0) {
      res.render('register', { errors })
    } else {
      //Form validation has passed - encrypt password
      password = bcrypt.hashSync(password,8)
      console.log(password)
    
    //create new record in db

    let insertRecord = await db.users.create({
      username: name,
      email: email,
      password: password,
      roleid: 1
    
    })
    }
    res.redirect('/blogs')  

  }catch (error) {
    console.log(error)
    res.render('register', {
      error: "This email is already been used."
    })
  }
  
 
})









module.exports = router
