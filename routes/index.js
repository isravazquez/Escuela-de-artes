const router = require('express').Router();
const alumnos = require('./alumno');
const maestros = require('./maestro');
const actividades = require('./actividad');
const inscripciones = require('./inscripcion');
const resenas = require('./resena');

//Configuracion Swagger
const swaggerSpec =  require('../config/swagger_config');

//Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

router.get('/', (req, res) => {
    res.json({ 'info': '¡Bienvenido a la API de la Escuela de Arte!' })
});

router.use('/alumnos', alumnos);
router.use('/actividades', actividades);
router.use('/maestros', maestros);
router.use('/inscripciones', inscripciones);
router.use('/resenas', resenas);
router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

//Catch 404 
router.use(function (req, res, next) {
    res.status(404).json({error: 'Not Found'})
});


module.exports = router;