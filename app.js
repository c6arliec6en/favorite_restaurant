const express = require('express')
const app = express()
const port = 3000
const expressHandlebars = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const resData = require('./models/restaurant')


// set static
app.use('/', express.static('public'))

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
    if (err) console.error('err')
  })
})

// Routing
app.get('/', (req, res) => {
  resData.find((err, resAll) => {
    if (err) return console.error('err')
    res.render('index', { resList: resAll })
  })

})

//詳細頁面
app.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id
  resData.findById(restaurantId, (err, restaurant) => {
    if (err) return console.error('err')
    res.render('detail', { res: restaurant })
  })
})

//進入編輯頁面
app.get('/restaurant/:id/edit', (req, res) => {
  resData.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error('err')
    res.render('edit', { res: restaurant })
  })
})

//送出編輯內容
app.post('/edit/:id', (req, res) => {
  resData.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error('err')

    restaurant.name = req.body.name
    restaurant.category = req.body.category
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.image = req.body.image
    restaurant.description = req.body.description

    restaurant.save()

    res.redirect('/restaurants/' + req.params.id)
  })
})

//觸發刪除
app.post('/restaurant/:id/delete', (req, res) => {
  resData.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error('err')
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

//進入新增頁面
app.get('/restaurant/new', (req, res) => {
  res.render('new')
})

app.post('/new', (req, res) => {

  const restaurant = resData({
    name: req.body.name,
    category: req.body.category,
    location: req.body.location,
    phone: req.body.phone,
    image: req.body.image,
    description: req.body.description,
  })

  console.log(restaurant)
  restaurant.save(err => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})


app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  resData.find((err, resAll) => {
    if (err) return console.error('err')
    const restaurants = resAll.filter(res => {
      return res.category.includes(keyword) || res.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { resList: restaurants, keyword: keyword })
  })
})

app.listen(port, () => {
  console.log('Starting')
})