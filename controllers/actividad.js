//Require de Modelo principal
const Actividad = require('../models/Actividad')

//Require de modelos auxiliares
const Maestro = require('../models/Maestro')
const Inscripcion = require('../models/Inscripcion');
const Resena = require('../models/Resena');


async function crearActividad(req, res) {
    const body = req.body;
    try {
        const actividad = await Actividad.create(body);
        res.status(201).json(actividad);
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
    }
}

async function actualizarActividad(req, res) {
    const id = req.params.id;
    const cambioSolicitado = req.body;
    try {
        const actividad = await Actividad.findByPk(id);
        if (!actividad) {
            res.status(404).json({ error: 'Actividad no encontrada' });
            return;
        }
        const estado = await Actividad.update(cambioSolicitado, { where: { id } });
        if (estado[0] === 0) {
            res.status(400).json({ error: 'Actividad no actualizada' })
            return;
        }
        const actividad_actualizada = await Actividad.findByPk(id);
        res.status(200).json(actividad_actualizada);
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
    }

}

async function eliminarActividad(req, res) {
    const id = req.params.id;
    try {
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
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
    }

}

async function obtenerActividades(req, res) {
    const nombre = req.query.nombre;
    const maestro_id = req.query.maestro_id;
    const costo = req.query.costo;
    const params = ['nombre', 'maestro_id', 'costo'];
    for (const parametro in req.query) {
        if (!params.includes(parametro)) {
            res.status(404).json({ error: `nombre parámetro ${parametro} incorrecto` });
            return;
        }
    }
    try {
        const actividades = await Actividad.findAll({ order: ['id'] });
        if (!actividades) {
            res.status(404).json({ error: 'Lista de actividades vacia' });
            return;
        }
        if (nombre) {
            let actividades_filtradas = Object.entries(actividades).filter(actividad => actividad[1].nombre === nombre);
            actividades_filtradas = Object.fromEntries(actividades_filtradas);
            res.json(actividades_filtradas);
            return;
        }
        if (maestro_id) {
            let actividades_filtradas = Object.entries(actividades).filter(actividad => actividad[1].maestro_id === maestro_id);
            actividades_filtradas = Object.fromEntries(actividades_filtradas);
            res.json(actividades_filtradas);
            return;
        }
        if (costo) {
            let actividades_filtradas = Object.entries(actividades).filter(actividad => actividad[1].costo === costo);
            actividades_filtradas = Object.fromEntries(actividades_filtradas);
            res.json(actividades_filtradas);
            return;
        }
        res.status(200).json(actividades);
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
    }
}

async function obtenerActividad(req, res) {
    const id = req.params.id;
    try {
        const actividad = await Actividad.findByPk(id);
        if (!actividad) {
            res.status(404).json({ error: 'Actividad no encontrada' });
            return;
        }
        res.status(200).json(actividad);
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
    }

}

//Pendiente de trycatch
async function detalleInscripciones(req, res) {
    const idActividad = req.params.id;
    const idInscripcion = req.params.idInscripcion
    try {
        if (idInscripcion === undefined) {
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
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
    }
}

async function detalleResenas(req, res) {
    const idActividad = req.params.id;
    const idResena = req.params.idResena
    try {
        if (idResena === undefined) {
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
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
    }
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