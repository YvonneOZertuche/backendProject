const authReq = (req, res, next) => {
  let auth = req.isAuthenticated() //set by passport if user is isAuthenticated

  if (auth) {
    return next()
  } else {
    res.direct('/login')
  }
}

module.exports = authReq
