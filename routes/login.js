const express = require('express')
const passport = require('passport');
const router = express.Router()
const db = ('../models')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  })
)

module.exports = router