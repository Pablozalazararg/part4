require("dotenv").config();

const PORT = process.env.PORT
const MONGODB_URI = process.env.MongoDB_URI
console.log(`ESTE ES EL PUERTO ${PORT}`)

module.exports = {
  MONGODB_URI,
  PORT
}