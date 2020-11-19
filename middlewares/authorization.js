function authorization(req, res, next) {
  if (req.loggedInUser.role === 'admin') {
    next()
  } else {
    throw { msg: 'Not authorized', status: 401 }
  }
}

module.exports = authorization