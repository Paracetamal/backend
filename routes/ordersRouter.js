const { Router } = require('express')
const router = new Router()

const createOrder = require('../controllers/orders/createOrder.js')
const listOrders = require('../controllers/orders/listOrders.js')
const payOrder = require('../controllers/orders/payOrder.js')

router.post('/create', (req, res) => createOrder(req, res))
router.get('/:clientId', (req, res) => listOrders(req, res, req.params.clientId))
router.post('/pay', (req, res) => payOrder(req, res))

module.exports = router