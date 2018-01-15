const express = require('express')
const router = express.Router()
const Campground = require('../models/campground')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

router.get('/', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/index', {
        campgrounds
      })
    }
  })
})

router.post('/', isLoggedIn, (req, res) => {
  const name = req.body.name
  const image = req.body.image
  const description = req.body.description
  const author = {
    id: req.user._id,
    username: req.user.username
  }
  const newCampground = { name, src: image, description, author }
  Campground.create(newCampground, (err, newCreated) => {
    if (err) {
      console.log(err)
    } else {
      console.log(newCreated)
      res.redirect('/')
    }
  })

})

router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new')
})

router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, foundOne) => {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/show', { camp: foundOne })
    }
  })
})

router.get('/:id/edit', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, foundOne) => {
    if (err) {
      res.redirect('/campgrounds')
    } else {
      res.render('campgrounds/edit', {camp: foundOne})
    }
  })
})

router.put('/:id', isLoggedIn, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.camp, (err, updatedOne) => {
    if (err) {
      console.log(err)
    } else {
      console.log(updatedOne)
      res.redirect('/campgrounds/' + req.params.id)
    }
  })
})

router.delete('/:id', isLoggedIn, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err, deletedOne) => {
    if (err) {
      res.redirect('/campgrounds')
    } else {
      console.log(deletedOne)
      res.redirect('/campgrounds')
    }
  })
})

module.exports = router