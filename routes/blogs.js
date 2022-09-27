const express = require(`express`);
const router = express.Router();

const fs = require('fs');
const db = require('../models');

router.use(express.json())
router.use(express.urlencoded({extended: true}))


router.get('/blogs', async (req, res) => {
    
    let data = await db.blogs.findAll()
    res.render(`blogs`, {
        data:data
    })
})

router.get('/logout', (req,res) => {
    req.logout()  //kills the auth session
    res.redirect('/#')
 })

module.exports = router;