const router = require('express').Router();
const auth = require('../config/auth');
const accesoPermitido = require('../middlewares/accesoPermitido');
const {
    crearInscripcion,
    actualizarInscripcion,
    eliminarInscripcion,
    obtenerInscripciones,
    obtenerInscripcion
} = require('../controllers/inscripcion')

//Crear inscripción
router.post('/',auth.required, accesoPermitido.soloAdmin, crearInscripcion);
//Actualizar inscripción
router.patch('/:id',auth.required, accesoPermitido.soloAdmin, actualizarInscripcion);
//Eliminar inscripción
router.delete('/:id',auth.required, accesoPermitido.soloAdmin, eliminarInscripcion);

//Obtener todas las reseñas
//Filtrado de inscripciones por alumno o actividad
router.get('/',auth.required, accesoPermitido.soloAdmin, obtenerInscripciones);
router.get('/:id',auth.required, accesoPermitido.soloAdmin, obtenerInscripcion);

module.exports = router;