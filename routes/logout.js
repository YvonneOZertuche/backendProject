router.get('/logout', (req, res) => {
  req.logout() //kills the auth session
  res.redirect('/')
})
