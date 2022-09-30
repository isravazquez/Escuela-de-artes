const router = require('express').Router();
const {
    crearResena,
    borrarResena,
    actualizarResena,
    consultarResenas,
    consultarResena
} = require('../controllers/resena')

router.get('/', consultarResenas);
router.get('/:id', consultarResena);
router.post('/', crearResena);
router.patch('/:id', actualizarResena);
router.delete('/:id', borrarResena);

module.exports = router;