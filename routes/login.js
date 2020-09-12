const db = require('../models')
const bcrypt = require('bcrypt')

const login = {}

login.get = (req, res) => {
  res.render('pages/login')
}

login.post = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const user = await db.User.findOne({ where: { email: email } })

  console.log(user);
  if( user && bcrypt.compareSync(password, user.dataValues.password)){
    res.redirect('/users')
  }else {
    res.redirect('/login')
  }
}

module.exports = login
