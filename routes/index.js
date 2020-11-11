const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const UserController  = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/products', ProductController.showProduct)
router.get('/products/:id', ProductController.getOneProduct)
router.use(authentication)
router.post('/add', ProductController.create)

module.exports = router