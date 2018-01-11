const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const Campground = require('./models/campground')
const CommentModel = require('./models/comment')
const User = require('./models/user')
const seedDB = require('./seeds')

seedDB()
const app = express()
// native ES6 promises
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/yelp_camp', {
  useMongoClient: true
})

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

// CONFIG PASSPORT
app.use(require('express-session')({
  secret: 'Anything here',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get('/', (req, res) => {
  res.render('landing-page')
})

app.get('/campgrounds', (req, res) => {
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

app.post('/campgrounds', (req, res) => {
  const name = req.body.name
  const image = req.body.image
  const description = req.body.description
  const newCampground = {name, src: image, description}
  Campground.create(newCampground, (err, newCreated) => {
    if (err) {
      console.log(err)
    } else {
      console.log(newCreated)
      res.redirect('/campgrounds')
    }
  })

})

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new')
})

app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, foundOne) => {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/show', {camp: foundOne})
    }
  })
})

app.get('/campgrounds/:id/comments/new', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', {camp: campground})
    }
  })
})

app.post('/campgrounds/:id/comments', (req, res) => {
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

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  User.register(
    new User({username: req.body.username}),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err)
        return res.redirect('/register')
      }
      console.log(user)
      passport.authenticate('local')(req, res, () => {
        res.redirect('/campgrounds')
      })
    }
  )
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), () => {
  //do nothing
})

app.listen(8080, '127.0.0.1', () => {
  console.log('Server is running...')
})
