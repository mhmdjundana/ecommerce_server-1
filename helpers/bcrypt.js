const { request } = require("express");

const bcrypt = require('bcryptjs')

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(+process.env.SALT)
  return bcrypt.hashSync(password, salt)
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

module.exports = { hashPassword, comparePassword }