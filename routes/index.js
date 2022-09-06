const express = require('express');
const router = express.Router()
exports = router
router.get('/', (req, res) => {
  res.render('index')
})

router.get('/logout', (req, res) => {
  req.logout() //kills the auth session
  res.redirect('/')
})


module.exports = router