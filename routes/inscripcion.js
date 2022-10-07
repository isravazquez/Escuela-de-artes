const router = require('express').Router();
const auth = require('../config/auth');
const passport = require('passport');

const {
    crearInscripcion,
    actualizarInscripcion,
    eliminarInscripcion,
    obtenerInscripciones,
    obtenerInscripcion
} = require('../controllers/inscripcion')

//Crear inscripción
router.post('/', passport.authenticate('bearer', {session:false}), auth.admin, auth.required, crearInscripcion);
//Actualizar inscripción
router.patch('/:id', passport.authenticate('bearer', {session:false}), auth.admin, auth.required, actualizarInscripcion);
//Eliminar inscripción
router.delete('/:id', passport.authenticate('bearer', {session:false}), auth.admin, auth.required, eliminarInscripcion);

//Obtener todas las inscripciones
//Filtrado de inscripciones por alumno o actividad
router.get('/', passport.authenticate('bearer', {session:false}), auth.admin, auth.required, obtenerInscripciones);
router.get('/:id', passport.authenticate('bearer', {session:false}), auth.admin, auth.required, obtenerInscripcion);

module.exports = router;