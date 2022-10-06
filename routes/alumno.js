const router = require('express').Router();
const auth = require('../config/auth');
const accesoPermitido = require('../middlewares/accesoPermitido');
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
router.post('/',auth.required, accesoPermitido.soloAdmin, crearAlumno);
//Modificar Alumno existente
router.patch('/:id',auth.required, accesoPermitido.soloAdmin, actualizarAlumno);
//Eliminar Alumno
router.delete('/:id',auth.required, accesoPermitido.soloAdmin, eliminarAlumno);

//Obtener todos los alumnos
router.get('/',auth.required, accesoPermitido.adminYMaestro, obtenerAlumnos);
//Obtener alumno por id
router.get('/:id',accesoPermitido.adminMaestroYAlumnoId, obtenerAlumno);

//Detalle de inscripciones de cada alumno
//Si se agrega el id de la inscripción se mostrara exclusivamente
router.get('/:id/inscripciones/:idInscripcion?',auth.required,accesoPermitido.adminMaestroYAlumnoId, detalleInscripciones);

//Detalle de reseñas de cada alumno
//Si se agrega el id de la reseña se mostrara exclusivamente
router.get('/:id/resenas/:idResena?',auth.required,accesoPermitido.adminMaestroYAlumnoId, detalleResenas);

module.exports = router;
