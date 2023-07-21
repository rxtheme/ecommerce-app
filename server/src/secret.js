require('dotenv').config()
const serverPort = process.env.SERVER_PORT || 3001
const mongoDbUrl = process.env.MONGODB_ATLAS_URL || 'mongodb://localhost:27017'


module.exports = { serverPort, mongoDbUrl }