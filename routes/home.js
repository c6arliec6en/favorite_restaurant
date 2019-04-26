const express = require('express')
const router = express.Router()
const resData = require('../models/restaurant')
const authenticated = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  resData.find({ userId: req.user._id }, (err, restaurantAll) => {
    if (err) return console.log('home page err')
    res.render('index', { resList: restaurantAll })
  })

})


// router.get('/', authenticated, (req, res) => {
//   resData.find((err, resAll) => {
//     if (err) return console.log('home page err')
//     res.render('index', { resList: resAll })
//   })

// })

module.exports = router