const router = require('express').Router();
const {
    crearMaestro,
    actualizarMaestro,
    eliminarMaestro,
    obtenerMaestros,
    obtenerMaestro,
    detalleActividades
} = require('../controllers/maestro')

//Crear nuevo Maestro
router.post('/', crearMaestro);
//Modificar Maestro existente
router.patch('/:id', actualizarMaestro);
//Eliminar Maestro
router.delete('/:id', eliminarMaestro);

//Obtener todos los Maestros
router.get('/', obtenerMaestros);
//Obtener maestro por id
router.get('/:id', obtenerMaestro);

//Detalle de actividades de cada maestro
//Si se agrega el id de la actividad se mostrara exclusivamente
router.get('/:id/actividades/:idActividad?', detalleActividades);

module.exports = router;