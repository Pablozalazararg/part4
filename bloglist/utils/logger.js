// imprimir mensajes de registro normales
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.log(...params)
  }
}

//todos los mensajes de error
const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.error(...params)
  }
}

module.exports = {
  info, error
}