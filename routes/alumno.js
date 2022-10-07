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
router.post('/', auth.admin, auth.required, crearAlumno);
//Modificar Alumno existente
router.patch('/:id', auth.admin, auth.required, actualizarAlumno);
//Eliminar Alumno
router.delete('/:id', auth.admin, auth.required, eliminarAlumno);

//Obtener todos los alumnos
router.get('/', auth.admin, auth.maestro,auth.required, obtenerAlumnos);
//Obtener alumno por id
router.get('/:id', auth.admin, auth.maestro, auth.alumnoId, auth.required, obtenerAlumno);

//Detalle de inscripciones de cada alumno
//Si se agrega el id de la inscripción se mostrara exclusivamente
router.get('/:id/inscripciones/:idInscripcion?', auth.admin, auth.maestro, auth.alumnoId, auth.required, detalleInscripciones);

//Detalle de reseñas de cada alumno
//Si se agrega el id de la reseña se mostrara exclusivamente
router.get('/:id/resenas/:idResena?', auth.admin, auth.maestro, auth.alumnoId, auth.required, detalleResenas);

module.exports = router;
