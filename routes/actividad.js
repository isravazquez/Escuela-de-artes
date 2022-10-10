const router = require('express').Router();
const auth = require('../config/auth');
const passport = require('passport');

const {
    crearActividad,
    actualizarActividad,
    eliminarActividad,
    obtenerActividades,
    obtenerActividad,
    detalleInscripciones,
    detalleResenas
} = require('../controllers/actividad')

//Crear nuevo Actividad
router.post('/', passport.authenticate('bearer', {session:false}), auth.admin, auth.required, crearActividad);
//Modificar Actividad existente
router.patch('/:id', passport.authenticate('bearer', {session:false}), auth.admin, auth.required, actualizarActividad);
//Eliminar Actividad
router.delete('/:id', passport.authenticate('bearer', {session:false}), auth.admin, auth.required, eliminarActividad);

//Obtener todos las actividades
router.get('/', passport.authenticate('bearer', {session:false}), auth.admin, auth.maestro, auth.alumno, auth.required, obtenerActividades);
//Obtener actividad por id
router.get('/:id', passport.authenticate('bearer', {session:false}), auth.admin, auth.maestro, auth.alumno, auth.required, obtenerActividad);

//Detalle de inscripciones de cada actividad
//Si se agrega el id de la inscripción se mostrara exclusivamente
router.get('/:id/inscripciones/:idInscripcion?', passport.authenticate('bearer', {session:false}), auth.admin, auth.required, detalleInscripciones);


//Detalle de resenas de cada actividad
//Si se agrega el id de la resena se mostrara exclusivamente
router.get('/:id/resenas/:idResena?', passport.authenticate('bearer', {session:false}), auth.admin, auth.required, detalleResenas);

module.exports = router;