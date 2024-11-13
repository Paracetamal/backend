const { Router } = require('express')
const router = new Router()
const multer = require('multer');
const multerConfig = require('../utils/multerConfig')

const createProduct = require('../controllers/products/createProduct.js')
const listProducts = require('../controllers/products/listProducts.js')
const listProduct = require('../controllers/products/listProduct.js')

router.get('/list/:page', (req, res) => listProducts(req, res, req.params.page = 1))
router.get('/:productName', (req, res) => listProduct(req, res, req.params.productName))
router.post('/create', multer(multerConfig).single('img'), (req, res) => createProduct(req, res))

module.exports = router