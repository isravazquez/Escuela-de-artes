const router = require('express').Router();
const {
    crearInscripcion,
    borrarInscripcion,
    actualizarInscripcion,
    consultarInscripciones,
    consultarInscripcion
} = require('../controllers/inscripcion')

router.get('/consultarTodas', consultarInscripciones);
router.get('/consultarPorId/:id', consultarInscripcion);
router.post('/crear', crearInscripcion);
router.delete('/borrar/:id', borrarInscripcion);
router.patch('/actualizar/:id', actualizarInscripcion);

module.exports = router;