const bcrypt = require('bcryptjs')
const saltForTest = +process.env.SALT || 10

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(saltForTest)
  return bcrypt.hashSync(password, salt)
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

module.exports = { hashPassword, comparePassword }