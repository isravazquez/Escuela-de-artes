const Resena = require('../models/Resena')

// RESEÑAS - Crear reseña
async function crearResena(req, res) {
    const data = req.body;

    //Valida exista datos en el cuerpo de la API
    if (!data) {
        res.status(404).json({ error: 'datos reseña vacía' });
        return;
    }

    //Valida exista Alumno y Actividad pasados por el cuerpo de la API
    try {
        //Crea reseña
        const resena = await Resena.create(data);
        res.status(201).json({ status: 'reseña creada con éxito', resena });
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

//RESEÑAS - Actuliza datos reseña
async function actualizarResena(req, res) {
    const id = req.params.id;
    const resena_actualizar = req.body;

    try {
        //Valida si existe reseña por su ID
        const resena = await Resena.findByPk(id);
        if (!resena) {
            res.status(404).json({ error: `Reseña ${id} no existe` });
            return;
        }

        //Actualiza datos reseña
        await Resena.update(resena_actualizar, { where: { id } });
        const resena_actualizada = await Resena.findByPk(id);
        res.status(200).json(resena_actualizada);
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, id: id, data: resena_actualizar 
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message, id: id, data: resena_actualizar
            });
        }
    }
}

//RESEÑAS - Elimina reseña por su id
async function eliminarResena(req, res) {
    const resena_id = req.params.id;

    try {
        //Valida exista reseña
        const resena = await Resena.findByPk(resena_id);
        if (!resena) {
            res.status(404).json({ error: `Reseña ${resena_id} no existe` });
            return;
        };

        //Elimina reseña
        const deleted = await Resena.destroy(
            { where: { id: resena_id } }
        )
        if (deleted === 1) {               //Si la eliminó
            res.status(200).json({ status: `id reseña ${resena_id} borrada con éxito`, resena });

        }
        else if (deleted === 0) {          //No la eliminó
            res.status(200).json({ status: `id reseña ${resena_id} no fue eliminada`, resena });
        }
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, id: resena_id, data: resena 
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message, id: resena_id, data: resena 
            });
        }
    }
};

// RESEÑAS - Consulta general
async function obtenerResenas(req, res) {
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
        //Busca todas las reseñas (sin filtro por id)
        const resenas = await Resena.findAll({ order: ['id'] });
        //Valida si hay reseñas
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
            let resenas_filtrados = Object.entries(resenas).filter(resena => resena[1].actividad_id == actividad_id);  //tipo dato diferente, se usa condición con ==
            resenas_filtrados = Object.fromEntries(resenas_filtrados);
            res.json(resenas_filtrados);
            return;
        }
        res.status(200).json(resenas);
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

async function obtenerResena(req, res) {
    const id = req.params.id;

    try {
        //Busca reseña por id
        const resena = await Resena.findByPk(id);
        //Valida si existe reseña
        if (!resena) {
            res.status(404).json({ error: `id reseña ${id} no existe` });
            return;
        }
        res.status(200).json(resena);
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
    crearResena,
    actualizarResena,
    eliminarResena,
    obtenerResenas,
    obtenerResena,
}