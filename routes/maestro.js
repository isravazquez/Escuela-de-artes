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
router.post('/', auth.admin, auth.required, crearMaestro);
//Modificar Maestro existente
router.patch('/:id', auth.admin, auth.required, actualizarMaestro);
//Eliminar Maestro
router.delete('/:id', auth.admin, auth.required, eliminarMaestro);

//Obtener todos los Maestros
router.get('/', auth.admin, auth.required, obtenerMaestros);
//Obtener maestro por id
router.get('/:id', auth.admin, auth.maestroId, auth.required, obtenerMaestro);

//Detalle de actividades de cada maestro
//Si se agrega el id de la actividad se mostrara exclusivamente
router.get('/:id/actividades/:idActividad?', auth.admin, auth.maestroId, auth.required, detalleActividades);

module.exports = router;