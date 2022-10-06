const router = require('express').Router();
const auth = require('../middlewares/auth');
const accesoPermitido = require('../middlewares/accesoPermitido');
const {
    crearResena,
    actualizarResena,
    eliminarResena,
    obtenerResenas,
    obtenerResena
} = require('../controllers/resena')

//Crear reseña
router.post('/',auth.required, accesoPermitido.adminYAlumno, crearResena);
//Actualizar reseña
router.patch('/:id',auth.required, accesoPermitido.adminYAlumno, actualizarResena)
//Eliminar reseña
router.delete('/:id',auth.required, accesoPermitido.adminYAlumno, eliminarResena);

//Obtener todas las reseñas
//filtrado de reseñas por alumno o actividad por el body
router.get('/',auth.required, obtenerResenas);
//Obtener reseña por id
router.get('/:id',auth.required, obtenerResena);

module.exports = router;