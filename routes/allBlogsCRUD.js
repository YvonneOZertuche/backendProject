const express = require(`express`);
const router = express.Router();

const fs = require('fs');
const db = require('../models');

router.use(express.json())
router.use(express.urlencoded({extended: true}))

//NOT WORKING - display individual blogs on index page
router.get('/index', async (req, res) => {
    try{
    console.log(db.blogs)
    let data = await db.blogs.findOne({where: {id:id}});
    res.render("index", {data:data})
    }
    catch(error){
        console.log(error)
    }
})

//new blog entry route
router.get('/newBlogEntry', (req, res) => {
    res.render(`newBlogEntry`, {
       
    })
})


//submit a new blog entry
router.post('/newBlogEntry', async (req, res) => {
    console.log('submit button used')
    //get data from the feedback.ejs header
    let {blogTitle, blogEntry} = req.body 
    console.log(`${blogTitle}, ${blogEntry}`)

    //I'll need to add another variable when Yvonne is ready to reference the userID via cookies
    console.log(req.session)
    await db.blogs.create({title:blogTitle, content:blogEntry, userID:req.session.passport.user})
    

    res.redirect('/dashboard');
})

//get all USER blog posts
router.get('/dashboard', async (req, res) => {
 try{
    let data = await db.blogs.findAll({
        where: { userID: req.session.passport.user}
    })
    res.render('dashboard', {
        data: data
    })
 }
catch(error){
    console.log(error)
}    


  // console.log(db.blogs)
  // let data = await db.blogs.findOne({where: {id:id}});
  // res.render("index", {data:data})
  // }
  // catch(error){
  //     console.log(error)
  // }

    res.redirect('/blogs');

})

//get all the blog posts
router.get('/getBlogs', async (req, res) => {
    try{
        console.log(db.blogs)
        let data = await db.blogs.findOne({where: {id:id}});
        res.render("index", {data:data})
    }
    catch(error){
        console.log(error)
    }
})

//blog edit routes
router.get('/blogEdit/:id', async (req, res) => {
    let {id} = req.params
    // console.log(id)
    let data = await db.blogs.findOne({where: {id:id}});
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

router.get('/displayuserblog', async (req, res) => {
  let data = await db.blogs.findAll({
    where: { userID: req.session.passport.user }
  })
  res.render(`userBlogs`, {
    data: data
  })
})



module.exports = router;