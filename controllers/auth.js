const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function register(req, res) {
  User
    .create(req.body) // register using the mongoose format i created in models/user
    .then(user => res.status(201).json({ 'message': `Thanks for registering ${user.username}` }))
    .catch(err => res.json(err))
}

function login(req, res) {
  User
    .findOne({ email: req.body.email }) // login by finding the users email and matching it with the password
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) { // check the details
        return res.status(401).json({ message: 'Unathorized' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' }) // create a token for the user using the secret i make, set a time for it to expire
      res.status(202).json({
        message: `Welcome back ${user.username}`, // return the token as a json object for the users browser to use
        token
      })
    })
    .catch(err => res.json(err))
}

module.exports = { register, login }