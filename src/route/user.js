const Model = require('../../models')
const uuid = require('uuid4')
const bycrypt = require('bcrypt')
const Joi = require('joi')
const schema = Joi.object({
  username: Joi.string()
      .alphanum()
      .min(5)
      .max(30)
      .required(),

  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  email: Joi.string()
      .email()
})

const newForm = (req, res) => {
  const validateMsg = req.session.validateMsg
  res.render('pages/newform', { validateMsg })
}

const postForm = (req, res) => {
  const { username, password, email } = req.body
  const avatar = req.files.avatar
  const arrName = avatar.name.split('.')
  const extFile = arrName[arrName.length - 1]
  const avatarName = uuid() + '.' + extFile

  const data = {
    username: username,
    email: email,
    password: bycrypt.hashSync(password, 10),
    avatar: avatarName
  }

  const { error, value } = schema.validate({ username, password, email })

  if (!error) {
    Model.user.create(data).then(() => {
      req.session.validateMsg = undefined
      avatar.mv('./uploads/' + avatarName)
      res.redirect('/show')
    })
  }
  else {
    req.session.validateMsg = error.details[0].message
    res.redirect('/new')
  }
}

const show = (req, res) => {
  Model.user.findAll({raw:true, nest:true}).then((data) => {
    res.render('pages/user', {data})
  })
}

const showByID = (req, res) => {
  const id = req.params.id
  Model.user.findByPk(id, {raw:true, nest:true}).then((data) => {
    res.render('pages/user_detail', {data})
  })
}

const deleteUser = (req, res) => {
  const id = req.params.id
  Model.user.destroy({where: {id}}).then(() => {
    res.redirect('/show')
  })
}

module.exports = {
  newForm,
  postForm,
  showByID,
  show,
  deleteUser
}
