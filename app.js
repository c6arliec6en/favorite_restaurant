const express = require('express')
const app = express()
const port = 3000
const favoriteRestaurant = require('./restaurant.json')
const expressHandlebars = require('express-handlebars')

// set static
app.use('/', express.static('public'))

//Handlebars setting
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



// Routing
app.get('/', (req, res) => {
  res.render('index', { resList: favoriteRestaurant.results })
})

app.get('/restaurants/:res_id', (req, res) => {
  const restaurant = favoriteRestaurant.results.filter(res => res.id === Number(req.params.res_id))

  res.render('show', { res: restaurant[0] })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = favoriteRestaurant.results.filter(res => {
    return res.category.includes(keyword) || res.name.toLowerCase().includes(keyword.toLowerCase())
  })
  console.log(keyword, restaurants)
  res.render('index', { resList: restaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log('Starting')
})