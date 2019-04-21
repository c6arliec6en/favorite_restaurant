const express = require('express')
const router = express.Router()
const resData = require('../models/restaurant')


router.get('/', (req, res) => {
  resData.find((err, resAll) => {
    if (err) return console.log('home page err')
    res.render('index', { resList: resAll })
  })

})

module.exports = router