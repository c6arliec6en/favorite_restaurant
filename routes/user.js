const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

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

  let errors = []

  if (!email || !password || !password2) {
    errors.push({ message: 'E-mail 和 密碼必填' })
  }

  if (password !== password2) {
    errors.push({ message: '請確認密碼是否輸入正確' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ message: '此E-mail已經註冊' })
        res.render('register', { name, email, password, password2, errors })
      } else {
        const newUser = new User({
          name, email, password,
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save().then(user => {
              res.redirect('/')
            }).catch(err => console.log('register err'))
          })
        })

      }
    })
  }



})

router.get('/logout', (req, res) => {
  req.flash('success_msg', '成功登出')
  req.logout()
  res.redirect('/users/login')
})


module.exports = router