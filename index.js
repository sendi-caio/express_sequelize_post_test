// START PLEASE FILL THIS
const yourName = 'ricky'
// END PLEASE FILL THIS

const express = require('express')
const app = express()
const portFinder = require('portfinder')
const hbs = require('express-hbs')
const bodyParser = require('body-parser')

const login = require('./routes/login')
const users = require('./routes/users')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

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
app.get('/', (req, res) => res.render('pages/root', { yourName }))

app.get('/login', login.get)
app.post('/login', login.post)

app.get('/users', users.get)
app.get('/users/new', users.create_get)
app.post('/users/new', users.create_post)
app.get('/users/details/:id', users.details)
app.get('/users/delete/:id', users.delete)


// ROUTES END

const start = async () => {
  const port = await portFinder.getPortPromise({ port: 4000 })
  app.listen(port, '0.0.0.0',() => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}
start()
