const router = require('express').Router();
const {
    crearInscripcion,
    actualizarInscripcion,
    eliminarInscripcion,
    obtenerInscripciones,
    obtenerInscripcion
} = require('../controllers/inscripcion')

//Crear inscripción
router.post('/', crearInscripcion);
//Actualizar inscripción
router.patch('/:id', actualizarInscripcion);
//Eliminar inscripción
router.delete('/:id', eliminarInscripcion);

//Obtener todas las reseñas
//Filtrado de inscripciones por alumno o actividad
router.get('/', obtenerInscripciones);
router.get('/:id', obtenerInscripcion);

module.exports = router;