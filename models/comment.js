const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  author: String,
  text: String,
}, { usePushEach: true })

module.exports = mongoose.model('Comment', commentSchema)