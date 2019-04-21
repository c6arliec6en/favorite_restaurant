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

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      console.log('User already exists')
      res.render('register', { name, email, password, password2 })
    } else {
      const newUser = new User({
        name, email, password,
      })
      newUser.save().then(user => {
        res.redirect('/')
      }).catch(err => console.log('register err'))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})


module.exports = router