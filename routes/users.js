const db = require('../models')
const path = require('path')
const rootPath = path.resolve(__dirname + '/../')
const uploadPath = path.join(rootPath, 'uploads')
const bcrypt = require('bcrypt')

const list = async(req, res) => {
    const user = await db.User.findAll({ raw: true, nest: true })
    res.render('pages/users/list', {user})
    //res.send(user)
}

const create_get = (req, res) => {
  res.render('pages/users/create')
}

const create_post = async(req, res) => {
  let avatar = ''
  const userData = req.body
  userData.password = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(8))

  if(req.files && req.files.avatar) {
      const upload = req.files.avatar

      const { v4: uuidv4 } = require('uuid')
      const nameArr = upload.name.split('.')
      const ext = '.' + nameArr[nameArr.length - 1]
      avatar = uuidv4() + ext
      upload.mv(path.join(uploadPath, avatar))
  }

  userData.avatar = avatar
  const newUser = await db.User.create(userData)
  if(newUser) res.redirect(`/users/${newUser.id}`)
  else res.send('failed')
}

const details = async(req, res) => {
  const id = req.params.id
  const user = await db.User.findByPk(id, { raw: true, nest: true })
  //res.send(user)
  user.avatar = '/uploads/' + user.avatar
  res.render('pages/users/details', { user })
}

module.exports = {
    list,
    create_get,
    create_post,
    details
}
