const { Product } = require('../models/')

function authorization(req, res, next) {
  const { id } = req.params
  Product
    .findByPk(id)
    .then(data => {
      if (!data) {
        throw { msg: 'Post not found', status: 404 }
      } else if (data.UserId === req.loggedInUser.id) {
        next()
      } else {
        throw { msg: 'Not authorized', status: 401 }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorization 