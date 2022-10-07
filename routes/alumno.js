const router = require('express').Router();
const auth = require('../config/auth');

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
router.post('/',auth.required, auth.admin, crearAlumno);
//Modificar Alumno existente
router.patch('/:id',auth.required, auth.admin, actualizarAlumno);
//Eliminar Alumno
router.delete('/:id',auth.required, auth.admin, eliminarAlumno);

//Obtener todos los alumnos
router.get('/',auth.required, auth.admin, auth.maestro, obtenerAlumnos);
//Obtener alumno por id
router.get('/:id',auth.required, auth.admin, auth.maestro, auth.alumnoId, obtenerAlumno);

//Detalle de inscripciones de cada alumno
//Si se agrega el id de la inscripción se mostrara exclusivamente
router.get('/:id/inscripciones/:idInscripcion?',auth.required, auth.admin, auth.maestro, auth.alumnoId, detalleInscripciones);

//Detalle de reseñas de cada alumno
//Si se agrega el id de la reseña se mostrara exclusivamente
router.get('/:id/resenas/:idResena?',auth.required, auth.admin, auth.maestro, auth.alumnoId, detalleResenas);

module.exports = router;
