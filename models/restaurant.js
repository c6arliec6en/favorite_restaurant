const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  map: {
    type: String,
  },
  rating: {
    type: Number
  },
  description: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('restaurant', restaurantSchema)