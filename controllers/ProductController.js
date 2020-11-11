const { Product } = require('../models/')

class ProductController {
  static showProduct(req, res, next) {
    Product.findAll()
      .then(data => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
  static getOneProduct(req, res, next) {
    Product.findByPk(+req.params.id)
      .then(data => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
  static create(req, res, next) {
    let { name, image_url, price, stock } = req.body
    console.log('==BODY==')
    console.log({ name, image_url, price, stock })
    Product.create({ name, image_url, price, stock })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController