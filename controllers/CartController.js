const { Cart, Product } = require('../models/')

class CartController {
  static async addCart (req, res, next) {
    let { qty, ProductId } = req.body
    try {
      let isCartExist = await Cart.findOne({ where: { ProductId, UserId: req.loggedInUser.id }})
      // console.log('isCartExist=========', isCartExist)
      if (isCartExist) {
        // jika sudah ada cart dengan product yg sama
        // console.log('exist', isCartExist.id)
        req.params.id = isCartExist.id
        // req.body.qty = isCartExist.qty
        // req.body.qty = isCartExist.qty + +qty
        // console.log('req.body.qty ==', req.body.qty)
        CartController.updateQty(req, res, next)
      } else {
        // console.log('not exist')
        // jika belum ada
        let productData = await Product.findOne({ where: { id: ProductId }})
        // console.log('productData ======', productData)
        if (productData) {
          if (qty > productData.stock) {
            throw ({ status: 400, msg: `Invalid quantity, stock: ${productData.stock}`})
          }
          let cartData = await Cart.create({ qty, UserId: req.loggedInUser.id, ProductId })
          // console.log('cartData ========', cartData)
          res.status(201).json(cartData)
        } else {
          throw ({ status: 404, msg: 'Product not found'})
        }
      }
    } catch (error) {
      // console.log('error==================')
      // console.log(error)
      next(error)
    }
  }
  static async showCarts (req, res, next) {
    try {
      let cartsData = await Cart.findAll({ where: { UserId: req.loggedInUser.id }, include: Product})
      // console.log('cartData ========', cartsData)
      res.status(200).json(cartsData)
    } catch (error) {
      // console.log('error==================')
      // console.log(error)
      next(error)
    }
  }
  static async removeCart (req, res, next) {
    try {
      let deleted = await Cart.destroy({ where: { id: req.params.id, UserId: req.loggedInUser.id }})
      // console.log('deleted ========', deleted)
      if (!deleted) {
        throw ({ status: 400, msg: 'Bad request' })
      }
      res.status(200).json({ msg: 'Card delete succeed' })
      // let deleted = await Cart.destroy({ where: { id: req.params.id, UserId: req.loggedInUser.id }})
    } catch (error) {
      // console.log('error==================')
      // console.log(error)
      next(error)
    }
  }
  static async updateQty (req, res, next) {
    let { qty } = req.body
    let { id } = req.params
    try {
      let cartData = await Cart.findOne({ where: { id }, include: Product })
      // console.log('cartData ========', cartData)
      // console.log('product ========', cartData.Product.stock)
      if (!cartData) {
        throw ({ status: 404, msg: 'Cart not found'})
      }
      if (qty > cartData.Product.stock) {
        throw ({ status: 400, msg: `Invalid quantity, stock: ${cartData.Product.stock}`})
      }
      let updated = await Cart.update(
        { qty }, 
        { where: { 
          id: req.params.id, 
          UserId: req.loggedInUser.id 
          },
          returning: true
        })
      // console.log('updated ========', updated)
      if (!updated) {
        throw ({ status: 400, msg: 'Bad request' })
      }
      res.status(200).json(updated[1][0])
    } catch (error) {
      // console.log('error==================')
      // console.log(error)
      next(error)
    }
  }
}

module.exports = CartController