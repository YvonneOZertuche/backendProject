const express = require(`express`);
const router = express.Router();

const fs = require('fs');
const db = require('../models');

router.use(express.json())
router.use(express.urlencoded({extended: true}))

// let feedbackObjs = require("../data/feedbackObjs.json")


router.get('/newBlogEntry', (req, res) => {
    res.render(`newBlogEntry`, {
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
    console.log(db.blogs)
    await db.blogs.create({title:blogTitle, content:blogEntry})
    
    
    res.redirect('/newBlogEntry');
})

//get route - to get all the blog posts
router.get('/getBlogs', async (req, res) => {
    try{
        console.log(db.blogs)
        let data = await db.blogs.findAll();
        res.render("blogs", {data:data})
    }
    catch(error){
        console.log(error)
    }
})

//blog edit route
router.get('/blogEdit/:id', async (req, res) => {
    let {id} = req.params
    // console.log(id)
    let data = await db.blogs.findOne({where: {id:id}});
    // res.json(data);
    res.render("blogEdit", {data: data})
})

router.post('/blogEdit', async (req, res) => {
    let {blogID, blogTitle, blogEntry} = req.body 
    console.log(`${blogID}, ${blogTitle}, ${blogEntry}`)
    await db.blogs.update({title:blogTitle, content:blogEntry}, {where:{id:blogID}})
    res.redirect('/blogs');
})

//blog delete route
router.post('/blogDelete', async (req, res) => {
    let {blogID} = req.body 
    console.log(blogID)
    await db.blogs.destroy({where: {id:blogID}})
    res.redirect('/blogs');
})


module.exports = router;