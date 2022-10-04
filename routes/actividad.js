const router = require('express').Router();
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
router.post('/', crearActividad);
//Modificar Actividad existente
router.patch('/:id', actualizarActividad);
//Eliminar Actividad
router.delete('/:id', eliminarActividad);

//Obtener todos las actividades
router.get('/', obtenerActividades);
//Obtener actividad por id
router.get('/:id', obtenerActividad);

//Detalle de inscripciones de cada actividad
//Si se agrega el id de la inscripción se mostrara exclusivamente
router.get('/:id/inscripciones/:idInscripcion?', detalleInscripciones);


//Detalle de resenas de cada actividad
//Si se agrega el id de la resena se mostrara exclusivamente
router.get('/:id/resenas/:idResena?', detalleResenas);

module.exports = router;