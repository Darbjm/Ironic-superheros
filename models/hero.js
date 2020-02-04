const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true }, // the text of the comment
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true } // the user who is making the comment, this is a referenced relationship
}, {
  timestamps: true
})


const heroSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  power: { type: String, required: true, maxlength: 200 },
  evil: { type: String, required: true },
  irony: { type: Number, required: true, min: 1, max: 10 },
  image: { type: String, required: true },
  comments: [commentSchema], // adding our commentSchema as an embedded array in the animal model, our comments will be ojects following the schema seen above // another required string, but this one has a max length
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true } // our referenced to the USER model, attaching a user field and defining that it will be a user model.
}, {
  timestamps: true
})

module.exports = mongoose.model('Hero', heroSchema)