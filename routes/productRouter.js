const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/products', ProductController.showProduct)
router.get('/products/:id', ProductController.getOneProduct)
router.use(authentication)
router.post('/add', authorization, ProductController.create)
router.delete('/delete/:id', authorization, ProductController.delete)
router.put('/update/:id', authorization, ProductController.update)

module.exports = router