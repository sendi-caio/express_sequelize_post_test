const db = require("../models");
const bcrypt = require('bcrypt')

const users = {}

users.get = async (req, res) => {
  const data = await db.User.findAll({raw: true, nest: true})
    res.render('pages/users', {data})
}

users.create_get = (req, res) => {
  res.render('pages/create')
}

users.create_post = async (req, res) => {
  const data = req.body
  console.log(req.body);
  data.password = bcrypt.hashSync(req.body.password, 10)
  await db.User.create(data)
  res.redirect('/users')
}

users.details = async (req, res) => {
  const data = await db.User.findOne({ where: { id: req.params.id }, raw: true, nest: true})
  res.render('pages/details', data)
}

users.delete = async (req, res) => {
  await db.User.destroy({ where: { id: req.params.id }})
  res.redirect('/users')
}

module.exports = users
