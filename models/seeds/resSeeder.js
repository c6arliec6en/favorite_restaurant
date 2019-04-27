const mongoose = require('mongoose')
const resSchema = require('../restaurant')
const favRes = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db err')
})

db.once('open', () => {
  console.log('db connected')
  const resData = favRes.results

  // resData.forEach(restaurant => {
  //   resSchema.create({
  //     name: this.name,
  //     name_en: this.name_en,
  //     category: this.category,
  //     image: this.image,
  //     location: this.location,
  //     phone: this.phone,
  //     map: this.google_map,
  //     rating: this.rating,
  //     description: this.description,
  //   })
  // });

  for (let i = 0; i < resData.length; i++) {
    resSchema.create({
      name: resData[i].name,
      name_en: resData[i].name_en,
      category: resData[i].category,
      image: resData[i].image,
      location: resData[i].location,
      phone: resData[i].phone,
      google_map: resData[i].google_map,
      rating: resData[i].rating,
      description: resData[i].description,
      userId: resData[i].userId
    })
  }
})
