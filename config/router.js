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

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

// router.route('/profile')
// .get(secureRoute, users.profile)

module.exports = router