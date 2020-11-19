const router = require('express').Router()
const CartController = require('../controllers/CartController')
const customerAuthorization = require('../middlewares/customerAuthorization')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/show-carts', CartController.showCarts)
router.use(customerAuthorization)
router.post('/add', CartController.addCart)
router.delete('/delete/:id', CartController.removeCart)
router.patch('/patch/:id', CartController.updateQty)

module.exports = router