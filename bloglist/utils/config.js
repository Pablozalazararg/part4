require("dotenv").config();

const PORT = process.env.PORT
const MONGODB_URI = process.env.MongoDB_URI



module.exports = {
  MONGODB_URI,
  PORT
}