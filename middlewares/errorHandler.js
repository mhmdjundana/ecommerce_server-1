module.exports = function (err, req, res, next) {
  // console.log('***masuk error handler***')
  // console.log(err)
  let status = err.status || 500
  let msg = err.name || err.msg || 'Internal server error!'

  if (err.name === 'SequelizeValidationError') {
    status = 400
    msg = err.errors.map( el => {
      return el.message
    }).join('<br/>')
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    msg = err.errors.map( el => {
      return el.message
    })
  }
  res.status(status).json({ msg })
}