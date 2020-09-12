// START PLEASE FILL THIS
const yourName = 'akmal'
// END PLEASE FILL THIS

const express = require('express')
const app = express()
const portFinder = require('portfinder')
const hbs = require('express-hbs')

const bodyParser = require('body-parser')

//file upload
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    createParentPath: true,
    debug : true,
  }))

//app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))

app.use(bodyParser.urlencoded({ extended: true}))

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
// ROUTES END

app.get('/dashboard', (req,res) => res.render('pages/dashboard'))
//users
const users = require('./routes/users')

app.get('/users', users.list)
app.get('/users/create', users.create_get)
app.post('/users/create', users.create_post)
app.get('/users/:id', users.details)

const start = async () => {
  const port = await portFinder.getPortPromise({ port: 4000 })
  app.listen(port, '0.0.0.0',() => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}
start()
