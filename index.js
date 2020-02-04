const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const { port, database } = require('./config/environment')
const logger = require('./lib/logger')
const router = require('./config/router')

mongoose.connect(database, { useNewUrlParser: true , useUnifiedTopology: true }, (err) => {
  if (err) return console.log(err)
  console.log('Mongo is connected')
})

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router) // puts api infront to separate the front and back end

app.listen(port, () => console.log(`Express is up and running on ${port}`))