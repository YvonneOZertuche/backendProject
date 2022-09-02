const express = require('express');
const router = express.Router()
exports = router
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router