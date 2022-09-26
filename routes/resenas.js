const router = require('express').Router();
const {
    crearResena,
    borrarResena,
    consultarResenas,
} = require('../controllers/inscripcion')

router.post('/', crearResena);
router.delete('/:id', borrarResena);
router.get('/', consultarResenas);

module.exports = router;