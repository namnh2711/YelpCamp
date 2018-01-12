const express = require('express')
const router = express.Router({mergeParams: true})
const Campground = require('../models/campground')
const CommentModel = require('../models/comment')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

router.get('/new', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', { camp: campground })
    }
  })
})

router.post('/', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
    } else {
      CommentModel.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err)
          res.redirect('/campgrounds/' + req.params.id)
        } else {
          campground.comments.push(comment._id)
          campground.save()
          res.redirect('/campgrounds/' + req.params.id)
        }
      })
    }
  })
})

module.exports = router