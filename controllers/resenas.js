const Resena = require('../models/Resena')

// RESEÑAS - Crear reseña 
async function crearResena(req, res) {
    const data = req.body;

/*     const inscripciones = await Inscripcion.findOne({
        where: {
            alumno_id: data.alumno_id,
            actividad_id: data.actividad_id
        }
    });

    if (inscripciones) {
        res.status(200).json({ RespuestaAlta: "Inscripción ya existe" });
        return;
    }; */

    const resena = Resena.create(data);

    res.status(201).json(resena);
    return;
};

async function borrarResena(req, res) {
    const resena_id = req.params.id;
    console.log(resena_id);
     const deleted = Resena.destroy(
        { where: { id: resena_id } }
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

// RESEÑAS - Consulta general
async function consultarResenas(req, res) {
    const resenas = await Resena.findAll();
    const alumno_id = req.query.alumno_id;                         //para un alumno en particular
    const actividad_id = req.query.actividad_id;                   //para una actividad en particular

    console.log(resenas);
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

module.exports = {
    crearResena,
    borrarResena,
    consultarResenas,
}