//Require de Modelo principal
const Resena = require('../models/Resena')

//Creación de una Reseña
//Petición requiere un body pero no parámetros 
async function crearResena(req, res) {
    const data = req.body;
    try {
        const resena = await Resena.create(data);
        res.status(201).json(resena);
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, data: data
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message, data: data
            });
        }
        return err;
    }
};

//Actualizar datos de una Reseña
//Petición requiere un body y un id en parámetros
async function actualizarResena(req, res) {
    const id = req.params.id;
    const resena_actualizar = req.body;
    try {
        const resena = await Resena.findByPk(id);
        if (!resena) {
            res.status(404).json({ error: `Reseña ${id} no existe` });
            return;
        }
        await Resena.update(resena_actualizar, { where: { id } });
        const resena_actualizada = await Resena.findByPk(id);
        res.status(200).json(resena_actualizada);
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, id: id, data: resena_actualizar
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message, id: id, data: resena_actualizar
            });
        }
        return err;
    }
}

//Eliminar una Reseña
//Petición no requiere un body pero sí un id en parámetros
async function eliminarResena(req, res) {
    const resena_id = req.params.id;
    try {
        const resena = await Resena.findByPk(resena_id);
        if (!resena) {
            res.status(404).json({ error: `Reseña ${resena_id} no existe` });
            return;
        }
        await Resena.destroy(
            { where: { id: resena_id } }
        );
        res.status(200).json({ status: `id reseña ${resena_id} borrada con éxito`, resena });
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, id: resena_id, data: resena
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message, id: resena_id, data: resena
            });
        }
        return err;
    }
};

//Obtener todas las Reseñas
//Petición no requiere un body ni parámetros, pero acepta queries para un filtrado
async function obtenerResenas(req, res) {
    const alumno_id = req.query.alumno_id;
    const actividad_id = req.query.actividad_id;
    const calificacion = req.query.calificacion;
    const params = ['alumno_id', 'actividad_id', 'calificacion'];
    for (const parametro in req.query) {
        if (!params.includes(parametro)) {
            res.status(404).json({ error: `nombre parámetro ${parametro} incorrecto` });
            return;
        }
    }

    try { //Queries posibles
        const resenas = await Resena.findAll({ order: ['id'] });
        if (!resenas) {
            res.status(404).json({ error: 'Lista de reseñas vacia' });
            return;
        }
        if (alumno_id) {
            let resenas_filtrados = Object.entries(resenas).filter(resena => resena[1].alumno_id == alumno_id);  
            resenas_filtrados = Object.fromEntries(resenas_filtrados);
            res.json(resenas_filtrados);
            return;
        }
        if (actividad_id) {
            let resenas_filtrados = Object.entries(resenas).filter(resena => resena[1].actividad_id == actividad_id);  
            resenas_filtrados = Object.fromEntries(resenas_filtrados);
            res.json(resenas_filtrados);
            return;
        }
        if (calificacion) {
            let resenas_filtrados = Object.entries(resenas).filter(resena => resena[1].calificacion == calificacion);  
            resenas_filtrados = Object.fromEntries(resenas_filtrados);
            res.json(resenas_filtrados);
            return;
        }
        res.status(200).json(resenas);
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
        return err;
    }
};

//Obtener una Reseña
//Petición no requiere un body pero sí un id en parámetros
async function obtenerResena(req, res) {
    const id = req.params.id;
    try {
        const resena = await Resena.findByPk(id);
        if (!resena) {
            res.status(404).json({ error: `id reseña ${id} no existe` });
            return;
        }
        res.status(200).json(resena);
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, id: id
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message, id: id
            });
        }
        return err;
    }
}

module.exports = {
    crearResena,
    actualizarResena,
    eliminarResena,
    obtenerResenas,
    obtenerResena,
}