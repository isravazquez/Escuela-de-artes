const router = require('express').Router();
const {
    crearResena,
    actualizarResena,
    eliminarResena,
    obtenerResenas,
    obtenerResena
} = require('../controllers/resena')

//Crear reseña
router.post('/', crearResena);
//Actualizar reseña
router.patch('/:id', actualizarResena)
//Eliminar reseña
router.delete('/:id', eliminarResena);

//Obtener todas las reseñas
//filtrado de reseñas por alumno o actividad por el body
router.get('/', obtenerResenas);
//Obtener reseña por id
router.get('/:id', obtenerResena);

module.exports = router;