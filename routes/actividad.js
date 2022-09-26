const router = require('express').Router();
const {
    crearActividad,
    actualizarActividad,
    eliminarActividad,
    obtenerActividades,
    obtenerActividad
} = require('../controllers/actividad')

router.post('/', crearActividad);
router.patch('/:id', actualizarActividad);
router.delete('/:id', eliminarActividad);
router.get('/', obtenerActividades);
router.get('/:id', obtenerActividad);

module.exports = router;