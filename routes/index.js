const router = require('express').Router()
// const ProductController = require('../controllers/ProductController')
const UserController  = require('../controllers/UserController')
// const authentication = require('../middlewares/authentication')
// const authorization = require('../middlewares/authorization')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use('/', productRouter)
router.use('/carts', cartRouter)

module.exports = router