const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')

const User = require('../models/user')

module.exports = passport => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({
      email: email,
    }).then(user => {
      if (!user) {
        return done(null, false, { message: 'The E-mail is not registered' })
      }
      if (user.password !== password) {
        return done(null, false, { message: 'The password is incorrect' })
      }
      return done(null, user)
    })
  }))

  //done 是否將User.id丟到req中？
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}