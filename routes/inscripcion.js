const router = require('express').Router();
const {
    crearInscripcion,
    borrarInscripcion,
    consultarInscripciones,
    consultarInscripcion
} = require('../controllers/inscripcion')

router.post('/', crearInscripcion);
router.delete('/:id', borrarInscripcion);
router.get('/', consultarInscripciones);
router.get('/:id', consultarInscripcion);

module.exports = router;
