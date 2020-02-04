const hero = require('../models/hero') // we require that model, defined and exported from '../models/hero.js'

// the requests are send here from the router.js, each url and verb combination will send the request to the appropirate controller, the controller will then use the Model to create or retreive some data, based on the nature of the request, then send the appropriate response back to client.

function index(req, res) { // Index controller handles ..... the index action, get and return all the athletes
  hero // the model
    .find() // using the mongoose method .find() on the model, with no arguments this will return all the athletes
    .then(foundHero => res.status(200).json(foundHero)) // then, if it succesfull finds them, we send them all back in the response as json
    .catch(err => console.log(err)) // if it fails, console logging the error for now
}

function create(req, res) {
  req.body.user = req.currentUser //attaching a user key to the request body as a user is now required when creating a hero, we have access to req.currentUser as this is a secureRoute and we set it there
  hero
    .create(req.body) // using the create method here, as we want to make a new hero, this will validate the incoming req.body to make sure it fits you schema for the model, thats the blueprint for how a hero should look defined in './models/hero.js'
    .then(createdHero => res.status(201).json(createdHero)) 
    .catch(err => console.log(err))
}

function show(req, res) {
  hero
    .findById(req.params.id) // using a method to find a single hero by its mongo id, this will return a single object, not in an array
    .then(hero => res.status(202).json(hero))
    .catch(err => console.log(err))
}

function update(req, res) {
  hero
    .findById(req.params.id)
    .then(hero => {
      if (!hero) return res.status(404).json({ message: 'Not Found' })
      Object.assign(hero, req.body)
      return hero.save()
    })
    .then(updatedHero => res.status(202).json(updatedHero))
    .catch(err => err.json(err))
}

function destroy(req, res) {
  hero
    .findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.json(err))
}

function commentCreate(req, res, next) { // comment create - /heros/:id/comments 
  req.body.user = req.currentUser
  hero
    .findById(req.params.id) // first find the hero by its id
    .then(hero => {
      if (!hero) return res.status(404).json({ message: 'Not Found' }) // return res 404 iuf not found
      hero.comments.push(req.body) // otherwise push the new comment into the heros comment array
      return hero.save() //  then resave the hero with the new comment
    })
    .then(hero => res.status(201).json(hero)) // send that hero with the new comment back
    .catch(next) // send any errors
}

function commentDelete(req, res) { // comment delete - /aniamls/:id/comments/:commentId
  hero
    .findById(req.params.id) // find the hero with the comment to be deleted
    .then(hero => {
      if (!hero) return res.status(404).json({ message: 'Not Found' })
      const comment = hero.comments.id(req.params.commentId) // find the comment on that hero that needs to be deleted
      if (!comment.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' }) // check the user making the request is the same user that posted the comment, we know this from our current user as this is a secure route. If not, return unatuhorised and don't delete the comment
      comment.remove() // remove that comment
      return hero.save().then(() => res.sendStatus(204)) //resave the hero with that new comment removed
    }
    )
    .catch(err => res.json(err)) //send any errors
}



module.exports = { index, create, show, update, destroy, commentCreate, commentDelete } 