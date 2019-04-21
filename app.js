const express = require('express')
const app = express()
const port = 3000
const expressHandlebars = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const resData = require('./models/restaurant')
const methodOverride = require('method-override')


// set static
app.use('/', express.static('public'))

//Use method-override
app.use(methodOverride('_method'))

//Handlebars setting
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('Database error')
})

db.once('open', () => {
  console.log('Database connected')
  const resAll = resData.find((err, resAll) => {
    if (err) console.error('err!!')
  })
})

// Routing
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/sort', require('./routes/sort'))


app.listen(port, () => {
  console.log('Starting')
})