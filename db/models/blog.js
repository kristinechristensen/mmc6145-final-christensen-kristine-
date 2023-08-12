import { Schema, model, models } from 'mongoose'

const TravelBlog = new Schema({
  location: {
    type: String,
    required: true,
    unique: true
  },
  memory: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 2000
  },
  date: {
    type:Date,

  }
})

//export default model.TravelBlog || model('TravelBlog', Schema)



