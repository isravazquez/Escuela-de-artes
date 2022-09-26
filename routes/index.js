
const router = require('express').Router();
const inscripciones = require('./inscripcion');

router.get('/', (req, res) => {
    res.json({'info': '¡Bienvenido a la API de la Escuela de Arte!'})
});

router.use('/v1/inscripciones', inscripciones);

module.exports = router;