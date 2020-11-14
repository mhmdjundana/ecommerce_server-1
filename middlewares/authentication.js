const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/')

async function authentication(req, res, next) {
  const { access_token } = req.headers
  try {
    if (!access_token) {
      throw { msg: 'Authentication failed', status: 401 }
    } else {
      const decoded = verifyToken(access_token)
      console.log(decoded)
      const user = await User.findOne({
        where: {
          email: decoded.email,
          id: decoded.id
        }
      })
      if (!user) {
        throw { msg: 'Authentication failed', status: 401 }
      } else {
        const { id, email, role } = user
        req.loggedInUser = { id, email, role }
        next()
      }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authentication