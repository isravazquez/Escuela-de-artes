const Maestro = require('../models/Maestro')
const Actividad = require('../models/Actividad');

async function crearMaestro(req, res) {  //Funciona sin mandar un id en el header pero en el body de la peticion si debe de llevar un valor forzozamente el id
    const body = req.body;
    const verificacionEmail = await Maestro.findOne({ where: { email: body.email } });
    const verificacionNombre = await Maestro.findOne({ where: { nombre: body.nombre, apellido: body.apellido } });

    if (verificacionEmail || verificacionNombre) {
        res.status(404).json({ error: 'Maestro ya registrado' }); //No se si el estatus 404 es correcto para este error
        return;
    }
    const maestro = await Maestro.create(body);
    res.status(201).json(maestro);
    return;
}

async function actualizarMaestro(req, res) {
    const id = req.params.id;
    const cambioSolicitado = req.body;
    const maestro = await Maestro.findByPk(id);
    if (!maestro) {
        res.status(404).json({ error: 'Maestro no encontrado' });
        return;
    }
    await Maestro.update(cambioSolicitado, { where: { id } });
    const maestro_actualizado = await Maestro.findByPk(id);
    res.status(200).json(maestro_actualizado);
    return;
}

async function eliminarMaestro(req, res) {
    const id = req.params.id;
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
}

async function obtenerMaestros(req, res) {
    const nombre = req.query.nombre;
    const apellido = req.query.apellido;
    const email = req.query.email;
    const maestros = await Maestro.findAll({order: ['id']});
    if (!maestros) {
        res.status(404).json({ error: 'Lista de maestros vacia' });
        return;
    } else if (nombre) {
        let maestros_filtrados = Object.entries(maestros).filter(maestro => maestro[1].nombre === nombre);
        maestros_filtrados = Object.fromEntries(maestros_filtrados);
        res.json(maestros_filtrados);
        return;
    } else if (apellido) {
        let maestros_filtrados = Object.entries(maestros).filter(maestro => maestro[1].apellido === apellido);
        maestros_filtrados = Object.fromEntries(maestros_filtrados);
        res.json(maestros_filtrados);
        return;
    } else if (email) {
        let maestros_filtrados = Object.entries(maestros).filter(maestro => maestro[1].email === email);
        maestros_filtrados = Object.fromEntries(maestros_filtrados);
        res.json(maestros_filtrados);
        return;
    }
    res.status(200).json(maestros);
    return;
}

async function obtenerMaestro(req, res) {
    const id = req.params.id;
    const maestro = await Maestro.findByPk(id);
    if (!maestro) {
        res.status(404).json({ error: 'Maestro no encontrado' });
        return;
    }
    res.status(200).json(maestro);
    return;
}

async function detalleInscripciones(req,res){
    const idMaestro = req.params.id;
    const idActividad = req.params.idActividad

    if(idActividad === undefined){
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
}


module.exports = {
    crearMaestro,
    actualizarMaestro,
    eliminarMaestro,
    obtenerMaestros,
    obtenerMaestro,
    detalleInscripciones
}