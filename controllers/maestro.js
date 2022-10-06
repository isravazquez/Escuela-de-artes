const Maestro = require('../models/Maestro')
const Actividad = require('../models/Actividad');

async function crearMaestro(req, res) {
    const body = req.body;
    try {
        const maestro = await Maestro.create(body);
        res.status(201).json(maestro);
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

async function actualizarMaestro(req, res) {
    const id = req.params.id;
    const cambioSolicitado = req.body;
    try {
        const maestro = await Maestro.findByPk(id);
        if (!maestro) {
            res.status(404).json({ error: 'Maestro no encontrado' });
            return;
        }
        const estado = await Maestro.update(cambioSolicitado, { where: { id } });
        if (estado[0] === 0) {
            res.status(400).json({ error: 'Maestro no actualizado' })
            return;
        }
        const maestro_actualizado = await Maestro.findByPk(id);
        res.status(200).json(maestro_actualizado);
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

async function eliminarMaestro(req, res) {
    const id = req.params.id;
    try {
        const maestro = await Maestro.findByPk(id);
        if (!maestro) {
            res.status(404).json({ error: 'Maestro no encontrado' });
            return;
        }
        const deleted = Maestro.destroy(
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

async function obtenerMaestros(req, res) {
    const nombre = req.query.nombre;
    const apellido = req.query.apellido;
    const email = req.query.email;
    try {
        const maestros = await Maestro.findAll({ order: ['id'] });
        if (!maestros) {
            res.status(404).json({ error: 'Lista de maestros vacia' });
            return;
        }
        if (nombre) {
            let maestros_filtrados = Object.entries(maestros).filter(maestro => maestro[1].nombre === nombre);
            maestros_filtrados = Object.fromEntries(maestros_filtrados);
            res.json(maestros_filtrados);
            return;
        }
        if (apellido) {
            let maestros_filtrados = Object.entries(maestros).filter(maestro => maestro[1].apellido === apellido);
            maestros_filtrados = Object.fromEntries(maestros_filtrados);
            res.json(maestros_filtrados);
            return;
        }
        if (email) {
            let maestros_filtrados = Object.entries(maestros).filter(maestro => maestro[1].email === email);
            maestros_filtrados = Object.fromEntries(maestros_filtrados);
            res.json(maestros_filtrados);
            return;
        }
        res.status(200).json(maestros);
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

async function obtenerMaestro(req, res) {
    const id = req.params.id;
    try {
        const maestro = await Maestro.findByPk(id);
        if (!maestro) {
            res.status(404).json({ error: 'Maestro no encontrado' });
            return;
        }
        res.status(200).json(maestro);
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

async function detalleActividades(req, res) {
    const idMaestro = req.params.id;
    const idActividad = req.params.idActividad
    try {
        if (idActividad === undefined) {
            const maestro = await Maestro.findByPk(idMaestro, {
                include: {
                    model: Actividad
                }
            });
            res.status(200).json(maestro);
            return;
        }
        const maestro = await Maestro.findByPk(idMaestro, {
            include: {
                model: Actividad,
                where: {
                    id: idActividad
                }
            }
        });
        res.status(200).json(maestro);
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
    crearMaestro,
    actualizarMaestro,
    eliminarMaestro,
    obtenerMaestros,
    obtenerMaestro,
    detalleActividades
}