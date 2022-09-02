const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  // passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/login'
//   })
)

module.exports = router
