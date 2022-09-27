const router = require('express').Router();
const {
    crearResena,
    borrarResena,
    consultarResenas,
} = require('../controllers/resena')

router.get('/', consultarResenas);
router.post('/', crearResena);
router.delete('/:id', borrarResena);

module.exports = router;