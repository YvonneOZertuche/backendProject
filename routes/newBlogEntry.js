const express = require(`express`);
const router = express.Router();

const fs = require('fs');
const db = require('../models');

router.use(express.json())
router.use(express.urlencoded({extended: true}))

// let feedbackObjs = require("../data/feedbackObjs.json")


router.get('/form', (req, res) => {
    res.render(`index`, {
        // "feedbackObjs":feedbackObjs
    })
})


//submit a new message
router.post('/newBlogEntry', async (req, res) => {
    console.log('submit button used')
    //get data from the feedback.ejs header
    let {blogTitle, blogEntry} = req.body 
    console.log(`${blogTitle}, ${blogEntry}`)

    //done: create a db and create a sequelize model in the db
    //define sequelize models in the js server (that means in the models file but really just here for now so we can make sure it works first)
    //use model.create to create a new row in the db table (see: https://dc-houston.herokuapp.com/p2/Postgres/Sequelize.html#21)

    //I'll need to add another variable when Yvonne is ready to reference the userID via cookies
    await db.blogs.create({title:blogTitle, content:blogEntry})
    
    res.redirect('/form');
})


module.exports = router;