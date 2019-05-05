const express = require('express')
const router = express.Router()
const resData = require('../models/restaurant')
const authenticated = require('../config/auth')
const multer = require('multer')


const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, './public/img/')
  },
  filename: (req, file, done) => {
    done(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })


//進入新增頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

router.post('/new', authenticated, upload.single('image'), (req, res) => {
  const { name, category, location, phone, description } = req.body
  const image = req.file.filename
  const restaurant = resData({
    name,
    category,
    location,
    phone,
    image,
    description,
    userId: req.user._id,
  })


  restaurant.save(err => {
    if (err) return console.log('create new data err')
    return res.redirect('/')
  })
})

router.get('/search', authenticated, (req, res) => {
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
router.get('/:id', authenticated, (req, res) => {
  const restaurantId = req.params.id
  resData.findById(restaurantId, (err, restaurant) => {
    if (err) return console.log('get detail err')
    res.render('detail', { res: restaurant })
  })
})

//進入編輯頁面
router.get('/:id/edit', authenticated, (req, res) => {
  resData.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log('edit err')
    res.render('edit', { res: restaurant })
  })
})

//送出編輯內容
router.put('/edit/:id', authenticated, upload.single('image'), (req, res) => {
  resData.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log('edit err')

    let image = ''
    if (!req.file) {
      image = restaurant.image
    } else {
      image = req.file.filename
    }

    restaurant.name = req.body.name
    restaurant.category = req.body.category
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.image = image
    restaurant.description = req.body.description

    restaurant.save()

    res.redirect('/restaurants/' + req.params.id)
  })
})

//觸發刪除
router.delete('/:id/delete', authenticated, (req, res) => {
  resData.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log('delete err')
    restaurant.remove(err => {
      if (err) return console.log('delete err')
      return res.redirect('/')
    })
  })
})


module.exports = router