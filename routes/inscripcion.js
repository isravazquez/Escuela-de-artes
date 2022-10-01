const router = require('express').Router();
const {
    crearInscripcion,
    borrarInscripcion,
    actualizarInscripcion,
    consultarInscripciones,
    consultarInscripcion
} = require('../controllers/inscripcion')

router.get('/', consultarInscripciones);
router.get('/:id', consultarInscripcion);
router.post('/', crearInscripcion);
router.delete('/:id', borrarInscripcion);
router.patch('/:id', actualizarInscripcion);

module.exports = router;