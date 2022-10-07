const router = require('express').Router();
const auth = require('../config/auth');

const {
    crearMaestro,
    actualizarMaestro,
    eliminarMaestro,
    obtenerMaestros,
    obtenerMaestro,
    detalleActividades
} = require('../controllers/maestro')

//Crear nuevo Maestro
router.post('/',auth.required, auth.admin, crearMaestro);
//Modificar Maestro existente
router.patch('/:id',auth.required, auth.admin, actualizarMaestro);
//Eliminar Maestro
router.delete('/:id',auth.required, auth.admin, eliminarMaestro);

//Obtener todos los Maestros
router.get('/',auth.required, auth.admin, obtenerMaestros);
//Obtener maestro por id
router.get('/:id',auth.required, auth.admin, auth.maestroId, obtenerMaestro);

//Detalle de actividades de cada maestro
//Si se agrega el id de la actividad se mostrara exclusivamente
router.get('/:id/actividades/:idActividad?',auth.required, auth.admin, auth.maestroId, detalleActividades);

module.exports = router;