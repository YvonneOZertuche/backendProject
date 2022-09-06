const express = require(`express`)
const router = express.Router()

const fs = require('fs')
const db = require('../models')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))


router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

module.exports = router

