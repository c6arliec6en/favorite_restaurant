const express = require('express')
const router = express.Router()
const resData = require('../models/restaurant')


//進入新增頁面
router.get('/new', (req, res) => {
  res.render('new')
  console.log(req.user)
})

router.post('/new', (req, res) => {

  const restaurant = resData({
    name: req.body.name,
    category: req.body.category,
    location: req.body.location,
    phone: req.body.phone,
    image: req.body.image,
    description: req.body.description,
    userId: req.user._id,
  })

  restaurant.save(err => {
    if (err) return console.log('create new data err')
    return res.redirect('/')
  })
})


router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  console.log(keyword)
  resData.find((err, resAll) => {
    if (err) return console.log('search err!')
    const restaurants = resAll.filter(res => {
      return res.category.includes(keyword) || res.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { resList: restaurants, keyword: keyword })
  })
})

//詳細頁面
router.get('/:id', (req, res) => {
  const restaurantId = req.params.id
  resData.findById(restaurantId, (err, restaurant) => {
    if (err) return console.log('get detail err')
    res.render('detail', { res: restaurant })
  })
})

//進入編輯頁面
router.get('/:id/edit', (req, res) => {
  resData.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log('edit err')
    res.render('edit', { res: restaurant })
  })
})

//送出編輯內容
router.put('/edit/:id', (req, res) => {
  resData.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log('edit err')

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
router.delete('/:id/delete', (req, res) => {
  resData.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log('delete err')
    restaurant.remove(err => {
      if (err) return console.log('delete err')
      return res.redirect('/')
    })
  })
})


module.exports = router