const express = require('express')
const router = express.Router()


router.use('/', require('.//home'))
router.use('/restaurants', require('./restaurant'))
router.use('/sort', require('./sort'))
router.use('/users', require('./user'))
router.use('/auth', require('./auths'))



module.exports = router