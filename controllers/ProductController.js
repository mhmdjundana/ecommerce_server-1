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
    Product.create({ name, image_url, price, stock })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static delete(req, res, next) {
    let id = +req.params.id
    Product.destroy({ where: { id } })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static update(req, res, next) {
    let { id, name, image_url, price, stock } = req.body
    console.log('data===========', name, image_url, price, stock)
    Product.update({ name, image_url, price, stock }, {
      where: {
        id
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController