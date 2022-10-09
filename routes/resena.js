const router = require('express').Router();
const auth = require('../config/auth');
const passport = require('passport');

const {
    crearResena,
    actualizarResena,
    eliminarResena,
    obtenerResenas,
    obtenerResena
} = require('../controllers/resena')

//Crear reseña
router.post('/', passport.authenticate('bearer', {session:false}), auth.admin, auth.alumno, auth.required, crearResena);
//Actualizar reseña
router.patch('/:id', passport.authenticate('bearer', {session:false}), auth.admin, auth.alumno, auth.required, actualizarResena)
//Eliminar reseña
router.delete('/:id', passport.authenticate('bearer', {session:false}), auth.admin, auth.alumno, auth.required, eliminarResena);

//Obtener todas las reseñas
//filtrado de reseñas por alumno o actividad por el body
router.get('/', passport.authenticate('bearer', {session:false}), /* auth.required, */ obtenerResenas);
//Obtener reseña por id
router.get('/:id', passport.authenticate('bearer', {session:false}), /* auth.required,  */obtenerResena);

module.exports = router;