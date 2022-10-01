const router = require('express').Router();
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
router.post('/', crearAlumno);
//Modificar Alumno existente
router.patch('/:id', actualizarAlumno);
//Eliminar Alumno
router.delete('/:id', eliminarAlumno);

//Obtener todos los alumnos
router.get('/', obtenerAlumnos);
//Obtener alumno por id
router.get('/:id', obtenerAlumno);

//Detalle de inscripciones de cada alumno
//Si se agrega el id de la inscripción se mostrara exclusivamente
router.get('/:id/inscripciones/:idInscripcion?', detalleInscripciones);

//Detalle de reseñas de cada alumno
//Si se agrega el id de la reseña se mostrara exclusivamente
router.get('/:id/resenas/:idResena?', detalleResenas);

module.exports = router;
