const mongoose = require('mongoose')
const userSchema = require('../user')
const users = require('./users.json')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db err')
})

db.once('open', () => {
  console.log('db connected')
  const userData = users.results
  for (let i = 0; i < userData.length; i++) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(userData[i].password, salt, (err, hash) => {
        if (err) throw err
        userData[i].password = hash

        userSchema.create({
          name: userData[i].name,
          email: userData[i].email,
          password: userData[i].password
        })

      })
    })


  }
})
