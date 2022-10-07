const router = require('express').Router();
const auth = require('../config/auth');

const {
    crearInscripcion,
    actualizarInscripcion,
    eliminarInscripcion,
    obtenerInscripciones,
    obtenerInscripcion
} = require('../controllers/inscripcion')

//Crear inscripción
router.post('/', auth.admin, auth.required, crearInscripcion);
//Actualizar inscripción
router.patch('/:id', auth.admin, auth.required, actualizarInscripcion);
//Eliminar inscripción
router.delete('/:id', auth.admin, auth.required, eliminarInscripcion);

//Obtener todas las inscripciones
//Filtrado de inscripciones por alumno o actividad
router.get('/', auth.admin, auth.required, obtenerInscripciones);
router.get('/:id', auth.admin, auth.required, obtenerInscripcion);

module.exports = router;