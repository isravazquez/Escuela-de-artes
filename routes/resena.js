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
router.post('/',auth.required, auth.admin, auth.alumno, crearResena);
//Actualizar reseña
router.patch('/:id',auth.required, auth.admin, auth.alumno, actualizarResena)
//Eliminar reseña
router.delete('/:id',auth.required, auth.admin, auth.alumno, eliminarResena);

//Obtener todas las reseñas
//filtrado de reseñas por alumno o actividad por el body
router.get('/',auth.required, obtenerResenas);
//Obtener reseña por id
router.get('/:id',auth.required, obtenerResena);

module.exports = router;