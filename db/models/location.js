import { Schema, model, models } from 'mongoose'

const Location = new Schema({
  location: {
    type: String,
    required: true,
    unique: true
  },
  reason: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 2000
  },
  img: {
    type:String,
    minLength:20,
    maxLength:100
  }
})

export default models.Location || model('Location', UserSchema)
