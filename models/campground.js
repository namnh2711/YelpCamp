const mongoose = require('mongoose')


const campgroundSchema = mongoose.Schema({
  name: String,
  src: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  }
}, { usePushEach: true })

module.exports = mongoose.model('Campground', campgroundSchema)