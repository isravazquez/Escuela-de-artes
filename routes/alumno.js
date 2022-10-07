const router = require('express').Router();
const auth = require('../config/auth');
const passport = require('passport');

const {
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno,
    obtenerAlumnos,
    obtenerAlumno,
    detalleInscripciones,
    detalleResenas
} = require('../controllers/alumno')



//Crear nuevo Alumno
router.post('/', passport.authenticate('bearer', {session:false}), auth.admin, auth.required, crearAlumno);
//Modificar Alumno existente
router.patch('/:id', passport.authenticate('bearer', {session:false}), auth.admin, auth.required, actualizarAlumno);
//Eliminar Alumno
router.delete('/:id', passport.authenticate('bearer', {session:false}), auth.admin, auth.required, eliminarAlumno);

//Obtener todos los alumnos
router.get('/', passport.authenticate('bearer', {session:false}), auth.admin, auth.maestro,auth.required, obtenerAlumnos);
//Obtener alumno por id
router.get('/:id', passport.authenticate('bearer', {session:false}), auth.admin, auth.maestro, auth.alumnoId, auth.required, obtenerAlumno);

//Detalle de inscripciones de cada alumno
//Si se agrega el id de la inscripción se mostrara exclusivamente
router.get('/:id/inscripciones/:idInscripcion?', passport.authenticate('bearer', {session:false}), auth.admin, auth.maestro, auth.alumnoId, auth.required, detalleInscripciones);

//Detalle de reseñas de cada alumno
//Si se agrega el id de la reseña se mostrara exclusivamente
router.get('/:id/resenas/:idResena?', passport.authenticate('bearer', {session:false}), auth.admin, auth.maestro, auth.alumnoId, auth.required, detalleResenas);




module.exports = router;
