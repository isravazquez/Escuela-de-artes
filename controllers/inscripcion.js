const Inscripcion = require('../models/Inscripcion')

// INSCRIPCIONES - Crear inscripción (solo si no existe)
async function crearInscripcion(req, res) {
    const data = req.body;

    //Valida si alumno ya está inscrito en una actividad
    try {
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

        //Crea inscripción
        const inscripcion = await Inscripcion.create(data)
        res.status(201).json({ status: 'Inscripcion creada con éxito', inscripcion });
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, data: data 
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message, data: data 
            });
        }
    }
};

//INSCRIPCIONES - Actuliza datos inscripción
async function actualizarInscripcion(req, res) {
    const id = req.params.id;
    const inscripcion_actualizar = req.body;

    try {
        //Valida si existe inscripción
        const inscripcion = await Inscripcion.findByPk(id);
        if (!inscripcion) {
            res.status(404).json({ error: `Inscripción ${id} no existe` });
            return;
        }

        //Actuliza datos inscripción,
        await Inscripcion.update(inscripcion_actualizar, { where: { id } });
        const inscripcion_actualizada = await Inscripcion.findByPk(id);
        res.status(200).json(inscripcion_actualizada);
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail,  id: id, data: inscripcion_actualizar 
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message,  id: id, data: inscripcion_actualizar
            });
        }
    }
}

//INSCRPCIONES - Elimina inscripción
async function eliminarInscripcion(req, res) {
    const inscripcion_id = req.params.id;

    try {
        //Valida si inscripción existe
        const inscripcion = await Inscripcion.findByPk(inscripcion_id);
        if (!inscripcion) {
            res.status(404).json({ error: `Inscripción ${inscripcion_id} no existe` });
            return;
        };

        //Elimina inscripción
        const deleted = await Inscripcion.destroy(
            { where: { id: inscripcion_id } }
        )
        if (deleted === 1) {       //Si la eliminó
            res.status(200).json({ status: `id inscripción ${inscripcion_id} borrada con éxito`, inscripcion });

        }
        else if (deleted === 0) {   //No la elimonó
            res.status(200).json({ status: `id inscripción ${inscripcion_id} no fue eliminada`, inscripcion });
        }
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail,  id: inscripcion_id, data: inscripcion 
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message,  id: inscripcion_id, data: inscripcion
            });
        }
    }
};

// INSCRIPCIONES - Consulta general
async function obtenerInscripciones(req, res) {
    //campos de filtrado por alumno o actividad 
    //Nota: si se capturan los dos campos en el cuerpo de la Api (alumno y actividad) siempre filtrará por alumno
    const alumno_id = req.query.alumno_id;                         //para un alumno en particular
    const actividad_id = req.query.actividad_id;                   //para una actividad en particular

    //Valida se pasen correctamente los nombres de los parametros
    for (const parametro in req.query) {
        console.log(parametro)
        if (parametro !== 'alumno_id' && parametro !== 'actividad_id') {
            res.status(404).json({ error: `nombre parámetro ${parametro} incorrecto` });
            return;
        }
    }

    try {
        //BUsca todas las inscripciones
        const inscripciones = await Inscripcion.findAll({ order: ['id'] });   //Ordenado por id
        //Valida si hay inscripciones
        if (!inscripciones) {
            res.status(404).json({ error: 'Lista de inscripciones vacia' });
            return;
        }
        //filtra las actividades de un alumno en particular
        else if (alumno_id) {
            let inscripciones_filtrados = Object.entries(inscripciones).filter(inscripcion => inscripcion[1].alumno_id == alumno_id);        //tipo dato diferente, se usa condición con ==
            inscripciones_filtrados = Object.fromEntries(inscripciones_filtrados);
            res.json(inscripciones_filtrados);
            return;
        }
        //filtra los alumnos para una actividad en particlar
        else if (actividad_id) {
            let inscripciones_filtrados = Object.entries(inscripciones).filter(inscripcion => inscripcion[1].actividad_id == actividad_id);  //tipo dato diferente, se usa condición con ==
            inscripciones_filtrados = Object.fromEntries(inscripciones_filtrados);
            res.json(inscripciones_filtrados);
            return;
        }
        res.status(200).json(inscripciones);
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, alumno_id: alumno_id, actividad_id: actividad_id 
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message, alumno_id: alumno_id, actividad_id: actividad_id
            });
        }
    }
};

async function obtenerInscripcion(req, res) {
    const id = req.params.id;

    try {
        //Busca inscripción por id
        const inscripcion = await Inscripcion.findByPk(id);
        //Valida si existe inscripción
        if (!inscripcion) {
            res.status(404).json({ error: `Inscripción ${id} no existe` });
            return;
        }
        res.status(200).json(inscripcion);
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, id: id 
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message, id: id
            });
        }
    }
}

module.exports = {
    crearInscripcion,
    actualizarInscripcion,
    eliminarInscripcion,
    obtenerInscripciones,
    obtenerInscripcion,
}