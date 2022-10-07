const router = require('express').Router();

const {
    logIn
} = require('../controllers/logIn')

router.post('/', logIn)

module.exports = router;