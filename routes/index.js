const router = require('express').Router();
const alumnos = require('./alumno');
const maestros = require('./maestro');
const actividades = require('./actividad');
const inscripciones = require('./inscripcion');
const resenas = require('./resena');

router.get('/', (req, res) => { 
    res.json({'info': '¡Bienvenido a la API de la Escuela de Arte!'})
});

router.use('/alumnos', alumnos);
router.use('/actividades', actividades);
router.use('/maestros', maestros);
router.use('/inscripciones', inscripciones);
router.use('/resenas', resenas);

module.exports = router;