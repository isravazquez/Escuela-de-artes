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
        res.status(200).json({ RespuestaAlta: "Inscripción ya existe" });
        return;
    };

    const inscripcion = Inscripcion.create(data);

    res.status(201).json(inscripcion);
    return;
};

async function borrarInscripcion(req, res) {
    const inscripcion_id = req.params.id;
    console.log(inscripcion_id);
     const deleted = Inscripcion.destroy(
        { where: { id: inscripcion_id } }
    ).then(function (rowDeleted) {
        if (rowDeleted === 1) {
            console.log("Borrado satisfactorio"),
                res.status(200).json(deleted);
                return;
        }
        else {
            res.status(200).json("Registro no encontrado");
            return;
        }
    }, function (err) {
        console.log(err),
            res.status(404).json({ error: "registro no eliminado" });
            return;
    }); 
    return;
};

// INSCRIPCIONES - Consulta general
async function consultarInscripciones(req, res) {
    const inscripciones = await Inscripcion.findAll();

    console.log('entro en inscripciones')


    const alumno_id = req.query.alumno_id;                         //para un alumno en particular
    const actividad_id = req.query.actividad_id;                   //para una actividad en particular

    console.log(inscripciones);
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
    crearInscripcion,
    borrarInscripcion,
    consultarInscripciones,
    consultarInscripcion
}