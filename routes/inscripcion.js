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
router.post('/',auth.required, auth.admin, crearInscripcion);
//Actualizar inscripción
router.patch('/:id',auth.required, auth.admin, actualizarInscripcion);
//Eliminar inscripción
router.delete('/:id',auth.required, auth.admin, eliminarInscripcion);

//Obtener todas las inscripciones
//Filtrado de inscripciones por alumno o actividad
router.get('/',auth.required, auth.admin, obtenerInscripciones);
router.get('/:id',auth.required, auth.admin, obtenerInscripcion);

module.exports = router;