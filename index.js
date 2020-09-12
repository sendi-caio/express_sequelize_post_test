// START PLEASE FILL THIS
const yourName = 'Disa'
// END PLEASE FILL THIS

const express = require('express')
const portFinder = require('portfinder')
const hbs = require('express-hbs')

const app = express()
app.use(express.static('public'))

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const fileUpload = require('express-fileupload')
app.use(fileUpload({
  debug: true
}))

var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}))

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
const login = require('./src/route/login')
app.get('/', login.getLogin)
app.post('/postlogin', login.postLogin)
app.get('/logout', login.getLogout)

const user = require('./src/route/user')
app.get('/new', user.newForm)
app.post('/post', user.postForm)
app.get('/show', user.show)
app.get('/show/:id', user.showByID)
app.get('/delete/:id', user.deleteUser)
// ROUTES END

const start = async () => {
  const port = await portFinder.getPortPromise({ port: 4000 })
  app.listen(port, '0.0.0.0',() => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}
start()
