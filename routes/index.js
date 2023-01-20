const express = require('express')
const router = express.Router()
const indexController = require('../controllers/index') 

// const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', indexController.getKanban)
router.post('/postItem', indexController.postItem)
router.put('/editItem', indexController.editItem)
router.put('/editStatus', indexController.editStatus)


module.exports = router