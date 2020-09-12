// START PLEASE FILL THIS
const yourName = 'dicky'
// END PLEASE FILL THIS

const express = require('express')
const portFinder = require('portfinder')
const hbs = require('express-hbs')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const cors = require('cors');
const morgan = require('morgan');

const app = express()
app.use(fileUpload({
  createParentPath: true
}));
app.use('/uploads', express.static('uploads'))

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// VIEWS CONFIG START
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/components',
  defaultLayout: __dirname + '/views/layouts/base',
  layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')
// VIEWS CONFIG END

// ROUTES START
// db
const db = require('./models')
app.get('/', (req, res) => res.render('pages/root', { yourName }))
app.get('/user/create', (req, res) => res.render('pages/form'))
app.post('/user/create', async (req, res) => {

  const userData = (req.body)
  const db = require('./models')

  if (req.files && req.files.avatar) {
    const image = req.files.avatar
    const { v4: uuidv4 } = require('uuid')
    let ext = image.name.split('.').pop()
    avatarHash = uuidv4() + `.${ext}`
    image.mv('./uploads/' + avatarHash)
  }
  userData.avatar = avatarHash

  const newUser = await db.Users.create(userData)
  if (newUser) {
    res.redirect(`/user/${newUser.id}`)
  } else res.send('failed')
})

app.get('/users', async (req, res) => {
  const users = await db.Users.findAll({raw: true, nest: true});
  console.log(users)
  res.render('pages/userslist', { users })
})
app.get('/user/:id', async (req, res) => {
  const id = req.params.id
  const userdetails = await db.Users.findByPk(id, { raw: true, nest: true })
  userdetails.avatar = '/uploads/' + userdetails.avatar
  res.render('pages/userdetails', { userdetails })
})
app.get('/login', (req, res) => {
  res.render('pages/login')
})

// ROUTES END
const start = async () => {
  const port = await portFinder.getPortPromise({ port: 4000 })
  app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}
start()
