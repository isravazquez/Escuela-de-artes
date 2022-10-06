const router = require('express').Router();
const auth = require('../middlewares/auth');
const accesoPermitido = require('../middlewares/accesoPermitido');
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
router.post('/',auth.required, accesoPermitido.soloAdmin, crearActividad);
//Modificar Actividad existente
router.patch('/:id',auth.required, accesoPermitido.soloAdmin, actualizarActividad);
//Eliminar Actividad
router.delete('/:id',auth.required, accesoPermitido.soloAdmin, eliminarActividad);

//Obtener todos las actividades
router.get('/',auth.required, obtenerActividades);
//Obtener actividad por id
router.get('/:id',auth.required, obtenerActividad);

//Detalle de inscripciones de cada actividad
//Si se agrega el id de la inscripción se mostrara exclusivamente
router.get('/:id/inscripciones/:idInscripcion?', auth.required, accesoPermitido.soloAdmin, detalleInscripciones);


//Detalle de resenas de cada actividad
//Si se agrega el id de la resena se mostrara exclusivamente
router.get('/:id/resenas/:idResena?', auth.required, accesoPermitido.soloAdmin, detalleResenas);

module.exports = router;