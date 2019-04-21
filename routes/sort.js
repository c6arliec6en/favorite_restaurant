const express = require('express')
const router = express.Router()
const resData = require('../models/restaurant')

router.get('/asc', (req, res) => {
  resData.find().sort({ name: 'asc' }).exec((err, restaurantList) => {
    return (err) ? console.log('sort asc err') : res.render('index', { resList: restaurantList })
  })
})

router.get('/desc', (req, res) => {
  resData.find().sort({ name: 'desc' }).exec((err, restaurantList) => {
    return (err) ? console.log('sort asc err') : res.render('index', { resList: restaurantList })
  })
})

router.get('/rating', (req, res) => {
  resData.find().sort({ rating: 'desc' }).exec((err, restaurantList) => {
    return (err) ? console.log('sort asc err') : res.render('index', { resList: restaurantList })
  })
})

router.get('/category', (req, res) => {
  resData.find().sort({ category: 'asc' }).exec((err, restaurantList) => {
    return (err) ? console.log('sort asc err') : res.render('index', { resList: restaurantList })
  })
})


module.exports = router
