const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = passport => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({
      email: email,
    }).then(user => {
      if (!user) {
        return done(null, false, { message: 'The E-mail is not registered' })
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'The password is incorrect' });
        }
      })

    })
  }))

  passport.use(
    new FacebookStrategy({
      clientID: '830274047340675',
      clientSecret: 'b922ef38bde59266e2d36554183afd46',
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      User.findOne({ email: profile._json.email }).then(user => {
        if (!user) {
          let randomPassword = Math.random().toString(36).slice(-8)
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(randomPassword, salt, (err, hash) => {
              const newUser = new User({
                name: profile._json.name,
                email: profile._json.email,
                password: hash,
              })
              newUser.save().then(user => {
                return done(null, user)
              }).catch(err => {
                console.log(err)
              })
            })
          })
        } else {
          return done(null, user)
        }
      })
    }
    ))



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