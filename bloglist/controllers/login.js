const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  //busca el usuario en la base de datos
  const user = await User.findOne({ username})

  //verifica si el usuario existe o si la contraseña es incorrecta
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash) //verifica si la contraseña es correcta


  if (!(user && passwordCorrect)) {  //usuario o la contraseña es incorrecta
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  

  const token = jwt.sign(userForToken, process.env.SECRET) //se crea un token

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter