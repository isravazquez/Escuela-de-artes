const router = require('express').Router();
const {
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno,
    obtenerAlumnos,
    obtenerAlumno
} = require('../controllers/alumno')

router.post('/', crearAlumno);
router.patch('/:id', actualizarAlumno);
router.delete('/:id', eliminarAlumno);
router.get('/', obtenerAlumnos);
router.get('/:id', obtenerAlumno);

module.exports = router;
