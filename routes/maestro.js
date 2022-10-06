const router = require('express').Router();
const auth = require('../config/auth');
const accesoPermitido = require('../middlewares/accesoPermitido');
const {
    crearMaestro,
    actualizarMaestro,
    eliminarMaestro,
    obtenerMaestros,
    obtenerMaestro,
    detalleActividades
} = require('../controllers/maestro')

//Crear nuevo Maestro
router.post('/',auth.required, accesoPermitido.soloAdmin, crearMaestro);
//Modificar Maestro existente
router.patch('/:id',auth.required, accesoPermitido.soloAdmin, actualizarMaestro);
//Eliminar Maestro
router.delete('/:id',auth.required, accesoPermitido.soloAdmin, eliminarMaestro);

//Obtener todos los Maestros
router.get('/',auth.required, accesoPermitido.soloAdmin, obtenerMaestros);
//Obtener maestro por id
router.get('/:id',auth.required,accesoPermitido.adminYMaestroId, obtenerMaestro);

//Detalle de actividades de cada maestro
//Si se agrega el id de la actividad se mostrara exclusivamente
router.get('/:id/actividades/:idActividad?',auth.required,accesoPermitido.adminYMaestroId, detalleActividades);

module.exports = router;