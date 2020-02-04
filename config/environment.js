const port = process.env.PORT || 4000
const database = process.env.MONGODB_URI || 'mongodb://localhost/restful-api'
const secret = process.env.SECRET || 'its a secret'
module.exports = { port, database, secret }