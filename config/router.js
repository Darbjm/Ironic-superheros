const router = require('express').Router()
const heros = require('../controllers/heros')
const users = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.route('/heros') 
  .get(heros.index)
  .post(secureRoute, heros.create) 

router.route('/heros/:id')
  .get(heros.show)
  .put(secureRoute, heros.update)
  .delete(secureRoute, heros.destroy)

router.route('/heros/:id/comments') // route to create, follows the idea we are creating a comment on a specific dinosaur (so using /dinosaur/:id first), then the comments attached so /comments
  .post(secureRoute, heros.commentCreate)

router.route('/heros/:id/comments/:commentId') // same as above but with an id of the comment so we can identify which comment it is we are trying to delete
  .delete(secureRoute, heros.commentDelete)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

module.exports = router