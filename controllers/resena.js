const Resena = require('../models/Resena')

// RESEÑAS - Crear reseña 
async function crearResena(req, res) {
    const data = req.body;

    const resena = await Resena.create(data);

    res.status(201).json({status: 'reseña creada con éxito', resena});

    return;
};

async function borrarResena(req, res) {
    const resena_id = req.params.id;

    const resena = await Resena.findByPk(resena_id);
    if (!resena) {
        res.status(404).json({ error: `Reseña ${resena_id} no existe` });
        return;
    };

    try {
        const deleted = await Resena.destroy(
            { where: { id: resena_id } }
        )
        if (deleted === 1) {
            res.status(200).json({status: `id reseña ${resena_id} borrada con éxito`, resena});

        }
        else if(deleted === 0) {
            res.status(200).json({status: `id reseña ${resena_id} no fue eliminada`, resena});
        }
        return;
    } catch (err) {
        res.status(400).json(err);
        return;
    }
};

async function actualizarResena(req, res) {
    const id = req.params.id;
    const resena_actualizar = req.body;
    const resena = await Resena.findByPk(id);
    if (!resena) {
        res.status(404).json({ error: `Reseña ${id} no existe` });
        return;
    }
    await Resena.update(resena_actualizar, { where: { id } });
    const resena_actualizada = await Resena.findByPk(id);
    res.status(200).json(resena_actualizada);
    return;
}

// RESEÑAS - Consulta general
async function consultarResenas(req, res) {
    const resenas = await Resena.findAll({order: ['id']});
    const alumno_id = req.query.alumno_id;                         //para un alumno en particular
    const actividad_id = req.query.actividad_id;                   //para una actividad en particular

    if (!resenas) {
        res.status(404).json({ error: 'Lista de reseñas vacia' });
        return;
    }
    //filtra las reseñas de un alumno en particular
    else if (alumno_id) {
        let resenas_filtrados = Object.entries(resenas).filter(resena => resena[1].alumno_id == alumno_id);  ////tipo dato diferente , se usa condición con ==
        resenas_filtrados = Object.fromEntries(resenas_filtrados);
        res.json(resenas_filtrados);
        return;
    }
    //filtra las reseñas para una actividad en particlar
    else if (actividad_id) {
        let resenas_filtrados = Object.entries(resenas).filter(resena => resena[1].actividad_id == actividad_id );  //tipo dato diferente, se usa condición con ==
        resenas_filtrados = Object.fromEntries(resenas_filtrados);
        res.json(resenas_filtrados);
        return;
    }
    res.status(200).json(resenas);
    return;
};

async function consultarResena(req, res) {
    const id = req.params.id;
    const resena = await Resena.findByPk(id);
    if (!resena) {
        res.status(404).json({ error: 'Reseña no existe' });
        return;
    }
    res.status(200).json(resena);
    return;
}

module.exports = {
    consultarResenas,
    consultarResena,
    crearResena,
    borrarResena,
    actualizarResena,
}