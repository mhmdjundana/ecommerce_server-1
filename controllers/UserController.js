const { User } = require('../models/')
const { signToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {

  static register(req, res, next) {
    let { email, password, role } = req.body

    User.create({ email, password, role })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    let { email, password } = req.body

    User.findOne({ where: { email } })
      .then(data => {
        if (!data) {
          throw { msg: 'invalid email/password' }
        } else {
          let decoded = comparePassword(password, data.password)

          if (decoded) {
            let access_token = signToken({ id: data.id, email: data.email })
            res.status(200).json({ access_token })
          } else {
            throw { msg: 'invalid email/password' }
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController