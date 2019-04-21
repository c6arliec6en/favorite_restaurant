const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  // 使用 passport 認證 ,這裡寫上 local 因為我們使用了 LocalStrategy
  passport.authenticate('local', {
    successRedirect: '/',                             // 登入成功會回到根目錄
    failureRedirect: '/users/login',                  // 失敗會留在原本頁面
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router