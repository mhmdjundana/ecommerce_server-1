function customerAuthorization(req, res, next) {
  if (req.loggedInUser.role === 'customer') {
    next()
  } else {
    throw { msg: 'Not authorized', status: 401 }
  }
}

module.exports = customerAuthorization