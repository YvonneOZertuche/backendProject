const express = require(`express`);
const router = express.Router();

const fs = require('fs');

router.use(express.json())
router.use(express.urlencoded({extended: true}))

// let feedbackObjs = require("../data/feedbackObjs.json")

const respondWithNewBlogEntry = function(request, response) {
    response.render('index');
}
const alsoRespondWithNewBlogEntry = (request, response) => {
    response.render('index');
}

router.get('/form', (req, res) => {
    res.send(`
    <form method="post" action="/newBlurbEntry">
        <div class="fields">
            <div class="field half">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" />
            </div>
            <div class="field half">
                <label for="parkName">Park Name</label>
                <input type="text" name="parkName" id="parkName" />
            </div>
            <div class="field">
                <label for="blurbEntry">Blurb Entry</label>
                <textarea name="blurbEntry" id="blurbEntry" rows="6"></textarea>
            </div>
        </div>
        <ul class="actions">
            <li><input type="submit" value="Send Message" class="primary" /></li>
            <li><input type="reset" value="Clear" /></li>
        </ul>
    </form>
    `);
    // res.render(`index`, {
    //     // "feedbackObjs":feedbackObjs
    // })
})
router.get('/form2', respondWithNewBlogEntry);
router.get('/form3', alsoRespondWithNewBlogEntry);

//submit a new message
router.post('/newBlurbEntry', (req, res) => {
    console.log('submit button used')
    //get data from the feedback.ejs header
    let {name, blogTitle, blogEntry} = req.body 
    console.log(`${name}, ${blogTitle}, ${blogEntry}`)

    //done: create a db and create a sequelize model in the db
    //define sequelize models in the js server (that means in the models file but really just here for now so we can make sure it works first)
    //use model.create to create a new row in the db table (see: https://dc-houston.herokuapp.com/p2/Postgres/Sequelize.html#21)
    

    
    res.redirect('/form');
})

module.exports = router;