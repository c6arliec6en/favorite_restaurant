const express = require('express')
const app = express()
const port = 3000
const expressHandlebars = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const resData = require('./models/restaurant')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const multer = require('multer')


if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}

//express session
app.use(session({
  secret: 'Hello World',
  resave: 'false',
  saveUninitialized: 'false',
})) //設定Secret金鑰

//use Passport
app.use(passport.initialize())
app.use(passport.session()) // passport內建 Session method 抓到 express-session 設定的 Secret 

//use flash middleware
app.use(flash())

//Load passport config
require('./config/passport')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// set static
app.use('/', express.static('public'))





//Use method-override
app.use(methodOverride('_method'))

//Handlebars setting
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('Database error')
})

db.once('open', () => {
  console.log('Database connected')
  const resAll = resData.find((err, resAll) => {
    if (err) console.error('err!!')
  })
})

// Routing
app.use(require('./routes/routes'))


app.listen(port, () => {
  console.log('Starting')
})