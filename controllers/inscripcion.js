const Inscripcion = require('../models/Inscripcion')

// INSCRIPCIONES - Crear inscripción (solo si no existe)
async function crearInscripcion(req, res) {
    const data = req.body;

    const inscripciones = await Inscripcion.findOne({
        where: {
            alumno_id: data.alumno_id,
            actividad_id: data.actividad_id
        }
    });

    if (inscripciones) {
        res.status(404).json({ error: "Inscripción ya existe", inscripciones });
        return;
    };

    try {
        const inscripcion = await Inscripcion.create(data)
        res.status(201).json({status: 'Inscripcion creada con éxito', inscripcion});
        return;
    } catch (err) {
        res.status(400).json(err);
        return;
    }
};

async function borrarInscripcion(req, res) {
    const inscripcion_id = req.params.id;

    const inscripcion = await Inscripcion.findByPk(inscripcion_id);
    if (!inscripcion) {
        res.status(404).json({ error: `Inscripción ${inscripcion_id} no existe` });
        return;
    };

    try {
        const deleted = await Inscripcion.destroy(
            { where: { id: inscripcion_id } }
        )
        if (deleted === 1) {
            res.status(200).json({status: `id inscripción ${inscripcion_id} borrada con éxito`, inscripcion});

        }
        else if(deleted === 0) {
            res.status(200).json({status: `id inscripción ${inscripcion_id} no fue eliminada`, inscripcion});
        }
        return;
    } catch (err) {
        res.status(400).json(err);
        return;
    }
};

async function actualizarInscripcion(req, res) {
    const id = req.params.id;
    const inscripcion_actualizar = req.body;
    const inscripcion = await Inscripcion.findByPk(id);
    if (!inscripcion) {
        res.status(404).json({ error: `Inscripción ${id} no existe` });
        return;
    }
    await Inscripcion.update(inscripcion_actualizar, { where: { id } });
    const inscripcion_actualizada = await Inscripcion.findByPk(id);
    res.status(200).json(inscripcion_actualizada);
    return;
}

// INSCRIPCIONES - Consulta general
async function consultarInscripciones(req, res) {
    const inscripciones = await Inscripcion.findAll({order: ['id']});

    const alumno_id = req.query.alumno_id;                         //para un alumno en particular
    const actividad_id = req.query.actividad_id;                   //para una actividad en particular

    if (!inscripciones) {
        res.status(404).json({ error: 'Lista de actividades vacia' });
        return;
    }
    //filtra las actividades de un alumno en particular
    else if (alumno_id) {
        let inscripciones_filtrados = Object.entries(inscripciones).filter(inscripcion => inscripcion[1].alumno_id == alumno_id);  ////tipo dato diferente , se usa condición con ==
        inscripciones_filtrados = Object.fromEntries(inscripciones_filtrados);
        res.json(inscripciones_filtrados);
        return;
    }
    //filtra los alumnos para una actividad en particlar
    else if (actividad_id) {
        let inscripciones_filtrados = Object.entries(inscripciones).filter(inscripcion => inscripcion[1].actividad_id == actividad_id );  //tipo dato diferente, se usa condición con ==
        inscripciones_filtrados = Object.fromEntries(inscripciones_filtrados);
        res.json(inscripciones_filtrados);
        return;
    }
    res.status(200).json(inscripciones);
    return;
};

async function consultarInscripcion(req, res) {
    const id = req.params.id;
    const inscripcion = await Inscripcion.findByPk(id);
    if (!inscripcion) {
        res.status(404).json({ error: 'Inscripción no existe' });
        return;
    }
    res.status(200).json(inscripcion);
    return;
}

module.exports = {
    consultarInscripciones,
    consultarInscripcion,
    crearInscripcion,
    borrarInscripcion,
    actualizarInscripcion,
 }