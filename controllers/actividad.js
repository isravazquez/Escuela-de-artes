//Require de Modelo principal
const Actividad = require('../models/Actividad')

//Require de modelos auxiliares
const Maestro = require('../models/Maestro')
const Inscripcion = require('../models/Inscripcion');
const Resena = require('../models/Resena');


async function crearActividad(req, res) {  //Funciona sin mandar un id en el header pero en el body de la peticion si debe de llevar un valor forzozamente el id
    const body = req.body;
    const verificacionNombre = await Actividad.findOne({ where: { nombre: body.nombre } });
    const verificacionMaestro = await Maestro.findByPk(body.maestro_id);

    if (verificacionNombre) {
        res.status(404).json({ error: 'Actividad ya registrada' }); //No se si el estatus 404 es correcto para este error
        return;
    }
    if (!verificacionMaestro) {
        res.status(404).json({ error: 'Maestro no encontrado, la actividad no puede ser registrada' });
        return;
    }
    const actividad = await Actividad.create(body);
    res.status(201).json(actividad);
    return;
}

async function actualizarActividad(req, res) {
    const id = req.params.id;
    const cambioSolicitado = req.body;
    const actividad = await Actividad.findByPk(id);
    if (!actividad) {
        res.status(404).json({ error: 'Actividad no encontrada' });
        return;
    }
    await Actividad.update(cambioSolicitado, { where: { id } });
    const actividad_actualizada = await Actividad.findByPk(id);
    res.status(200).json(actividad_actualizada);
    return;
}

async function eliminarActividad(req, res) {
    const id = req.params.id;
    const actividad = await Actividad.findByPk(id);
    if (!actividad) {
        res.status(404).json({ error: 'Actividad no encontrada' });
        return;
    }
    const deleted = Actividad.destroy(
        { where: { id } }
    );
    res.status(200).json(deleted);
    return;
}

async function obtenerActividades(req, res) {
    const nombre = req.query.nombre;
    const maestro_id = req.query.maestro_id;
    const costo = req.query.costo;
    const actividades = await Actividad.findAll({order: ['id']});
    if (!actividades) {
        res.status(404).json({ error: 'Lista de actividades vacia' });
        return;
    } else if (nombre) {
        let actividades_filtradas = Object.entries(actividades).filter(actividad => actividad[1].nombre === nombre);
        actividades_filtradas = Object.fromEntries(actividades_filtradas);
        res.json(actividades_filtradas);
        return;
    } else if (maestro_id) {
        let actividades_filtradas = Object.entries(actividades).filter(actividad => actividad[1].maestro_id === maestro_id);
        actividades_filtradas = Object.fromEntries(actividades_filtradas);
        res.json(actividades_filtradas);
        return;
    } else if (costo) {
        let actividades_filtradas = Object.entries(actividades).filter(actividad => actividad[1].costo === costo);
        actividades_filtradas = Object.fromEntries(actividades_filtradas);
        res.json(actividades_filtradas);
        return;
    }
    res.status(200).json(actividades);
    return;
}

async function obtenerActividad(req, res) {
    const id = req.params.id;
    const actividad = await Actividad.findByPk(id);
    if (!actividad) {
        res.status(404).json({ error: 'Actividad no encontrada' });
        return;
    }
    res.status(200).json(actividad);
    return;
}

async function detalleInscripciones(req,res){
    const idActividad = req.params.id;
    const idInscripcion = req.params.idInscripcion
    if(idInscripcion === undefined){
        const actividad = await Actividad.findByPk(idActividad, {
            include: {
                model: Inscripcion
            }
        });
        res.status(200).json(actividad);
        return;
    }
    const actividad = await Actividad.findByPk(idActividad, {
        include: {
            model: Inscripcion,
            where: {
                id: idInscripcion
            }
        }
    });
    res.status(200).json(actividad);
    return;
}

async function detalleResenas(req,res){
    const idActividad = req.params.id;
    const idResena = req.params.idResena

    if(idResena === undefined){
        const actividad = await Actividad.findByPk(idActividad, {
            include: {
                model: Resena
            }
        });
        res.status(200).json(actividad);
        return;
    }
    const actividad = await Actividad.findByPk(idActividad, {
        include: {
            model: Resena,
            where: {
                id: idResena
            }
        }
    });
    res.status(200).json(actividad);
    return;
}

module.exports = {
    crearActividad,
    actualizarActividad,
    eliminarActividad,
    obtenerActividades,
    obtenerActividad,
    detalleInscripciones,
    detalleResenas
}