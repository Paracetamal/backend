const { Router } = require('express')
const router = new Router()

const loginAdmin = require('../controllers/admin/loginAdmin.js')
const registerAdmin = require('../controllers/admin/registerAdmin.js')

router.post('/login', (req, res) => loginAdmin(req, res))
router.post('/register', (req, res) => registerAdmin(req, res))

module.exports = router