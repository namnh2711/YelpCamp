const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
// native ES6 promises
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/yelp_camp', {
    useMongoClient: true
})

const campgroundSchema = mongoose.Schema({
    name: String,
    src: String,
    description: String
})

const Campground = mongoose.model('Campground', campgroundSchema)

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('landing-page')
})

app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err)
        } else {
            res.render('index', { campgrounds })
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
            res.redirect('/campgrounds')
        }
    })

})

app.get('/campgrounds/new', (req, res) => {
    res.render('new')
})

app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id, (err, foundOne) => {
        if (err) {
            console.log(err)
        } else {
            res.render('show', {camp: foundOne})
        }
    })
})

app.listen(8080, '127.0.0.1', () => {
    console.log('Server is running...')
})
