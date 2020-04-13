const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// building the user info

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.set('toJSON', { // this is what prevents the pasword being sent when our user object is converted to JSON
  transform(doc, json) {
    delete json.password // we delete the password key of the json object here
    return json
  }
})

userSchema.virtual('createdHeros', {
  ref: 'Hero',
  localField: '_id',
  foreignField: 'user'
})

userSchema.virtual('likedHeros', {
  ref: 'Hero',
  localField: '_id',
  foreignField: 'likes.user'
})

userSchema
  .set('toJSON', {
    virtuals: true,
    transform(doc, json) {
      delete json.password
      return json
    }
  })

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password) //this.password refers to the password in the userSchema object
}

userSchema
  .virtual('passwordConfirmation') // set a non saving section on the object that doesn't need to be remembered
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) { // checks password and passwordConfirmation match
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function hashPassword(next) { // hash the password making it unreadable on files
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

module.exports = mongoose.model('User', userSchema)