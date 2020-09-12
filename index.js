// START PLEASE FILL THIS
const yourName = 'please fill your name'
// END PLEASE FILL THIS

const express = require('express')
const portFinder = require('portfinder')
const hbs = require('express-hbs')

const app = express()
app.use(express.static('public'))

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

const start = async () => {
  const port = await portFinder.getPortPromise({ port: 4000 })
  app.listen(port, '0.0.0.0',() => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}
start()
