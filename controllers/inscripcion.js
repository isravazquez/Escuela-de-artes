//Require de Modelo principal
const Inscripcion = require('../models/Inscripcion')

//Creación de una Inscripción
//Petición requiere un body pero no parámetros 
async function crearInscripcion(req, res) {
    const data = req.body;
    try { //Valida si alumno ya está inscrito en una actividad
        const validaInscripcion = await Inscripcion.findOne({
            where: {
                alumno_id: data.alumno_id,
                actividad_id: data.actividad_id
            }
        });
        if (validaInscripcion) {
            res.status(404).json({ error: "Inscripción ya existe", validaInscripcion });
            return;
        };
        const inscripcion = await Inscripcion.create(data)
        res.status(201).json(inscripcion);
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
}

//Actualizar datos de una Inscripción
//Petición requiere un body y un id en parámetros
async function actualizarInscripcion(req, res) {
    const id = req.params.id;
    const inscripcion_actualizar = req.body;
    try {
        const inscripcion = await Inscripcion.findByPk(id);
        if (!inscripcion) {
            res.status(404).json({ error: `Inscripción ${id} no existe` });
            return;
        }
        await Inscripcion.update(inscripcion_actualizar, { where: { id } });
        const inscripcion_actualizada = await Inscripcion.findByPk(id);
        res.status(200).json(inscripcion_actualizada);
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, id: id, data: inscripcion_actualizar
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message, id: id, data: inscripcion_actualizar
            });
        }
        return err;
    }
}

//Eliminar una Inscripción
//Petición no requiere un body pero sí un id en parámetros
async function eliminarInscripcion(req, res) {
    const inscripcion_id = req.params.id;
    try {
        const inscripcion = await Inscripcion.findByPk(inscripcion_id);
        if (!inscripcion) {
            res.status(404).json({ error: `Inscripción ${inscripcion_id} no existe` });
            return;
        }
        await Inscripcion.destroy(
            { where: { id: inscripcion_id } }
        );
        res.status(200).json({ status: `id inscripción ${inscripcion_id} borrada con éxito`, inscripcion });
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, id: inscripcion_id, data: inscripcion
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message, id: inscripcion_id, data: inscripcion
            });
        }
        return err;
    }
};

//Obtener todas las Inscripciones
//Petición no requiere un body ni parámetros, pero acepta queries para un filtrado
async function obtenerInscripciones(req, res) {
    const alumno_id = req.query.alumno_id;
    const actividad_id = req.query.actividad_id;
    const params = ['alumno_id', 'actividad_id'];
    for (const parametro in req.query) {
        if (!params.includes(parametro)) {
            res.status(404).json({ error: `nombre parámetro ${parametro} incorrecto` });
            return;
        }
    }
    try { //Queries posibles
        const inscripciones = await Inscripcion.findAll({ order: ['id'] });   //Ordenado por id
        if (!inscripciones) {
            res.status(404).json({ error: 'Lista de inscripciones vacia' });
            return;
        }
        if (alumno_id) {
            let inscripciones_filtrados = Object.entries(inscripciones).filter(inscripcion => inscripcion[1].alumno_id == alumno_id);       
            inscripciones_filtrados = Object.fromEntries(inscripciones_filtrados);
            res.json(inscripciones_filtrados);
            return;
        }
        if (actividad_id) {
            let inscripciones_filtrados = Object.entries(inscripciones).filter(inscripcion => inscripcion[1].actividad_id == actividad_id); 
            inscripciones_filtrados = Object.fromEntries(inscripciones_filtrados);
            res.json(inscripciones_filtrados);
            return;
        }
        res.status(200).json(inscripciones);
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

//Obtener una Inscripción
//Petición no requiere un body pero sí un id en parámetros
async function obtenerInscripcion(req, res) {
    const id = req.params.id;
    try {
        const inscripcion = await Inscripcion.findByPk(id);
        if (!inscripcion) {
            res.status(404).json({ error: `Inscripción ${id} no existe` });
            return;
        }
        res.status(200).json(inscripcion);
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
    crearInscripcion,
    actualizarInscripcion,
    eliminarInscripcion,
    obtenerInscripciones,
    obtenerInscripcion,
}