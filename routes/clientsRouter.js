const { Router } = require('express')
const router = new Router()

const listClients = require('../controllers/clients/listClients.js')
const getClientDetails = require('../controllers/clients/getClientDetails.js')
const registerClient = require('../controllers/clients/registerClient.js')

router.get('/list/:page', (req, res) => listClients(req, res, req.params.page = 1))
router.get('/:clientId', (req, res) => getClientDetails(req, res, req.params.clientId))
router.post('/register', (req, res) => registerClient(req, res))

module.exports = router