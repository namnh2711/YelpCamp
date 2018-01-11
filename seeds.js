const mongoose = require('mongoose')
const Campground = require('./models/campground')
const Comment = require('./models/comment')
mongoose.set('debug', true)
const data = [
  {
    name: 'Campground 1',
    src: 'https://images.unsplash.com/photo-1451324119451-db0ac857463c?auto=format&fit=crop&w=1050&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 1',
  },
  {
    name: 'Campground 2',
    src: 'https://images.unsplash.com/photo-1481278403982-f2d9f387cdcc?auto=format&fit=crop&w=1050&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 2',
  },
  {
    name: 'Campground 3',
    src: 'https://images.unsplash.com/photo-1490682143684-14369e18dce8?auto=format&fit=crop&w=1050&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 3',
  }
]

function seedDB() {
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err)
    }
    Comment.remove({}, (err) => {
      if (err) {
        console.log(err)
      }
      data.forEach((seed) => {
        Campground.create(seed, (err, campground) => {
          if (err) {
            console.log(err)
          } else {
            console.log('Campground created!')
            // create comment
            Comment.create({
              author: 'Someone',
              text: 'This is a comment from someone'
            }, (err, comment) => {
              if (err) {
                console.log(err)
              } else {
                console.log('Comment Created!')
                campground.comments.push(comment._id)
                campground.save()
              }
            })
          }
        })
      })
    })
  })
}

module.exports = seedDB