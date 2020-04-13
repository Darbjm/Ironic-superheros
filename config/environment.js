const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 4000
const database = process.env.MONGODB_URI || `mongodb://localhost/restful-api-${env}`
const secret = process.env.SECRET || 'its a secret'
module.exports = { port, database, secret }