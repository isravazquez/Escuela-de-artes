const router = require('express').Router();
const alumnos = require('./alumno');
const maestros = require('./maestro');
const actividades = require('./actividad');

router.get('/', (req, res) => {
    res.json({'info': '¡Bienvenido a la API de la Escuela de Arte!'})
});

router.use('/v1/alumnos', alumnos);
router.use('/v1/actividades', actividades);
router.use('/v1/maestros', maestros);

module.exports = router;