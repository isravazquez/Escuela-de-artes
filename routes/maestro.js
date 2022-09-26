const router = require('express').Router();
const {
    crearMaestro,
    actualizarMaestro,
    eliminarMaestro,
    obtenerMaestros,
    obtenerMaestro
} = require('../controllers/maestro')

router.post('/', crearMaestro);
router.patch('/:id', actualizarMaestro);
router.delete('/:id', eliminarMaestro);
router.get('/', obtenerMaestros);
router.get('/:id', obtenerMaestro);

module.exports = router;