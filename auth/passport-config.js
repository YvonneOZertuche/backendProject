const passport = require('passport');
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const db = require('../models')

const init = passport => {
  //req => passport => sessionid req.isAuthenticated() => response
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          console.log(email, password)
          let records = await db.users.findAll({ where: { email: email } }) // [{}]
          console.log('checkpoint 1')
          if (records) {
            let record = records[0]
            //get the db password and compare it to the password that was entered into the form

            bcrypt.compare(password, record.password, (err, match) => {
              if (match) {
                console.log('passwords matched')
                //req.session
                return done(null, record)
              } else {
                console.log(`passwords didn't match`)
                return done(null, false)
              }
            })
          } else {
            //no user in our database
            return done(null, false)
          }
        } catch (error) {
          //error in trying to retrieve something from our db
          console.log(error)
          return done(error)
        }
      }
    )
  )
  //add the user info to the session

  passport.serializeUser((user, done) => {
    done(null, user.id) //second argument is what goes on the session, session.id
  })
  //check if user is valid
  //grab session id from user cookie
  //decode code with
  passport.deserializeUser(async (id, done) => {
    try {
      let foundUserInDBFromSessionID = await db.users.findByPk(id) // return object if found

      if (foundUserInDBFromSessionID) {
        done(null, foundUserInDBFromSessionID) //still authenticated
      } else {
        done(null, false) //have to log back in
      }
    } catch (error) {
      done(null, false)
    }
  })
}

module.exports = init

