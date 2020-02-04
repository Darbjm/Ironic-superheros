const mongoose = require('mongoose') 
const { database } = require('../config/environment') 
const Hero = require('../models/hero')
const User = require('../models/user')


mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase() 
    .then(() => {
      return User.create([
        {
          username: 'james',
          email: 'james@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        }
      ])
    })
    .then(createdUsers => { // our createdUsers become our argument to this block, we can reference them as createdUser[0] and createdUser[1]
      console.log(`${'👩🏼‍🎨'.repeat(createdUsers.length)} users created`) // this now logs succesfully creating the users before the dinosaurs now
      return Hero.create([
        {
          name: 'anit-grav',
          power: 'Can fly but only up',
          evil: 'Good',
          irony: 8,
          image: 'https://qph.fs.quoracdn.net/main-qimg-425696cf9d76d2df24fa705265dc7911',
          user: createdUsers[0]
        }, {
          name: 'Vissy man',
          power: 'Turns all his clothes invisible',
          evil: 'Good',
          irony: 6,
          image: 'https://media.istockphoto.com/photos/naked-man-walking-in-cardboard-box-picture-id184302911',
          user: createdUsers[0]
        }, {
          name: '2inch Joe',
          power: 'Runs super fast, has terrible stamina',
          evil: 'Evil',
          irony: 7,
          image: 'https://pbs.twimg.com/profile_images/649853855262347264/R2bb97CX.jpg',
          user: createdUsers[0]
        }, {
          name: 'armband man',
          power: 'Breaths under water, can\'t swim',
          evil: 'Evil',
          irony: 4,
          image: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/20264831_10213463598687021_1500445561936583958_n.jpg?_nc_cat=100&_nc_ohc=cKkr9HNhTfcAX_KyhHi&_nc_ht=scontent-cdg2-1.xx&oh=ca1b5d93f1af8a45c22deae2e657c152&oe=5EDA427F',
          user: createdUsers[0]
        }, {
          name: 'turtle neck',
          power: 'Extendable neck, can never retract it',
          evil: 'Good',
          irony: 8,
          image: 'https://i.ytimg.com/vi/OctUE8Nptzw/maxresdefault.jpg',
          user: createdUsers[0]
        }, {
          name: 'not sure if its a man anymore man',
          power: 'Turns into an animal at random. To turn back he has to keep changin until he randomly turns into a human',
          evil: 'Good',
          irony: 6,
          image: 'https://www.thesprucepets.com/thmb/hvB0e_NN4HdsnxXOzOHKVUz8Dt4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-626916125-5b3a4a8046e0fb00379f682d.jpg',
          user: createdUsers[0]
        }, {
          name: 'teleport-aloo',
          power: 'Teleports, can\t choose where',
          evil: 'Good',
          irony: 5,
          image: 'https://gigaom.com/wp-content/uploads/sites/1/2012/08/shutterstock_23639869.jpg',
          user: createdUsers[0]
        }
      ])
    })
    .then(createdHero => console.log(`${'🦸🏼‍♂️ '.repeat(createdHero.length)} Heros created `))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})