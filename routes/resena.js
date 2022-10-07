const router = require('express').Router();
const auth = require('../config/auth');

const {
    crearResena,
    actualizarResena,
    eliminarResena,
    obtenerResenas,
    obtenerResena
} = require('../controllers/resena')

//Crear reseña
router.post('/', auth.admin, auth.alumno, auth.required, crearResena);
//Actualizar reseña
router.patch('/:id', auth.admin, auth.alumno, auth.required, actualizarResena)
//Eliminar reseña
router.delete('/:id', auth.admin, auth.alumno, auth.required, eliminarResena);

//Obtener todas las reseñas
//filtrado de reseñas por alumno o actividad por el body
router.get('/',auth.required, obtenerResenas);
//Obtener reseña por id
router.get('/:id',auth.required, obtenerResena);

module.exports = router;