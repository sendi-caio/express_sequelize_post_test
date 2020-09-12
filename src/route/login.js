const Model = require('../../models')
const bycrypt = require('bcrypt')

const getLogin = (req, res) => {
  const errMsg = { err: req.session.errMsg }
  res.render('pages/getlogin', {errMsg})
}

const postLogin = async (req, res) => {
  const { email, password } = req.body
  const user = await Model.user.findOne({where: {email}})
  if (user && (bycrypt.compareSync(password, user.password))) {
    req.session.username = user.username
    res.redirect('/show')
  }
  else {
    req.session.errMsg = 'invalid email and password!'
    res.redirect('/')
  }
}

const getLogout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/')
  })
}

module.exports = {
  getLogin,
  postLogin,
  getLogout
}
