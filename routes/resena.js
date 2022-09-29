const router = require('express').Router();
const {
    crearResena,
    borrarResena,
    actualizarResena,
    consultarResenas,
    consultarResena
} = require('../controllers/resena')

router.get('/consultarTodas', consultarResenas);
router.get('/consultarPorId/:id', consultarResena);
router.post('/crear', crearResena);
router.patch('/actualizar/:id', actualizarResena);
router.delete('/borrar/:id', borrarResena);

module.exports = router;