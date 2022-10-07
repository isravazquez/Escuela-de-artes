const router = require('express').Router();
const auth = require('../config/auth');

const {
    crearActividad,
    actualizarActividad,
    eliminarActividad,
    obtenerActividades,
    obtenerActividad,
    detalleInscripciones,
    detalleResenas
} = require('../controllers/actividad')

//Crear nuevo Actividad
router.post('/',auth.required, auth.admin, crearActividad);
//Modificar Actividad existente
router.patch('/:id',auth.required, auth.admin, actualizarActividad);
//Eliminar Actividad
router.delete('/:id',auth.required, auth.admin, eliminarActividad);

//Obtener todos las actividades
router.get('/',auth.required, obtenerActividades);
//Obtener actividad por id
router.get('/:id',auth.required, obtenerActividad);

//Detalle de inscripciones de cada actividad
//Si se agrega el id de la inscripción se mostrara exclusivamente
router.get('/:id/inscripciones/:idInscripcion?', auth.required, auth.admin, detalleInscripciones);


//Detalle de resenas de cada actividad
//Si se agrega el id de la resena se mostrara exclusivamente
router.get('/:id/resenas/:idResena?', auth.required, auth.admin, detalleResenas);

module.exports = router;