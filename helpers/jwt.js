const jwt = require('jsonwebtoken')
let secret = process.env.SECRET || 'qwerty'

function signToken(payload) {
  return jwt.sign(payload, secret)
}

function verifyToken(token) {
  return jwt.verify(token, secret)
}

module.exports = { signToken, verifyToken }