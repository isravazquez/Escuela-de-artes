//Require de Modelo principal
const Maestro = require('../models/Maestro')
//Require de modelos auxiliares
const Actividad = require('../models/Actividad');

//Creación de un Maestro
//Petición requiere un body pero no parámetros 
async function crearMaestro(req, res) {
    const { password: pass, ...maestroBody } = req.body;
    try { //Evitamos mostrar la contraseña por temas de seguridad
        const password = Maestro.crearPassword(pass)
        const maestroARegistrar = { ...maestroBody, ...password }
        const maestro = await Maestro.create(maestroARegistrar);
        delete maestro.dataValues.password_salt
        delete maestro.dataValues.password_hash
        res.status(201).json(maestro);
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, data: maestroBody
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message, data: maestroBody
            });
        }
        return err;
    }
}

//Actualizar datos de un Maestro
//Petición requiere un body y un id en parámetros
async function actualizarMaestro(req, res) {
    const id = req.params.id;
    const cambioSolicitado = req.body;
    try { //Evitamos mostrar la contraseña por temas de seguridad
        const maestro = await Maestro.findByPk(id);
        if (!maestro) {
            res.status(404).json({ error: `Maestro ${id} no existe` });
            return;
        }
        await Maestro.update(cambioSolicitado, { where: { id } });
        const maestro_actualizado = await Maestro.findByPk(id);
        delete maestro_actualizado.dataValues.password_salt
        delete maestro_actualizado.dataValues.password_hash
        res.status(200).json(maestro_actualizado);
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, data: cambioSolicitado
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message, data: cambioSolicitado
            });
        }
        return err;
    }
}

//Eliminar un Maestro
//Petición no requiere un body pero sí un id en parámetros
async function eliminarMaestro(req, res) {
    const id = req.params.id;
    try { //Evitamos mostrar la contraseña por temas de seguridad
        const maestro = await Maestro.findByPk(id);
        if (!maestro) {
            res.status(404).json({ error: `Maestro ${id} no existe` });
            return;
        }
        await Maestro.destroy(
            { where: { id } }
        );
        delete maestro.dataValues.password_salt;
        delete maestro.dataValues.password_hash;
        res.status(200).json({ status: `id maestro ${id} borrada con éxito`, maestro });
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, id: id, data: maestro
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message, id: id, data: maestro
            });
        }
        return err;
    }
}

//Obtener todos los Maestros
//Petición no requiere un body ni parámetros, pero acepta queries para un filtrado
async function obtenerMaestros(req, res) {
    const nombre = req.query.nombre;
    const apellido = req.query.apellido;
    const email = req.query.email;
    const params = ['nombre', 'apellido', 'email'];
    for (const parametro in req.query) {
        if (!params.includes(parametro)) {
            res.status(404).json({ error: `nombre parámetro ${parametro} incorrecto` });
            return;
        }
    }
    try { //Queries posibles
        const maestros = await Maestro.findAll({ order: ['id'] });
        //Evitamos mostrar la contraseña por temas de seguridad
        if (!maestros) {
            res.status(404).json({ error: 'Lista de maestros vacia' });
            return;
        }
        if (nombre) {
            let maestros_filtrados = Object.entries(maestros).filter(maestro => maestro[1].nombre == nombre);
            maestros_filtrados = Object.fromEntries(maestros_filtrados);
            for (const key in maestros_filtrados) {
                delete maestros_filtrados[key].dataValues.password_salt;
                delete maestros_filtrados[key].dataValues.password_hash;
            }
            res.json(maestros_filtrados);
            return;
        }
        if (apellido) {
            let maestros_filtrados = Object.entries(maestros).filter(maestro => maestro[1].apellido == apellido);
            maestros_filtrados = Object.fromEntries(maestros_filtrados);
            for (const key in maestros_filtrados) {
                delete maestros_filtrados[key].dataValues.password_salt;
                delete maestros_filtrados[key].dataValues.password_hash;
            }
            res.json(maestros_filtrados);
            return;
        }
        if (email) {
            let maestros_filtrados = Object.entries(maestros).filter(maestro => maestro[1].email == email);
            maestros_filtrados = Object.fromEntries(maestros_filtrados);
            for (const key in maestros_filtrados) {
                delete maestros_filtrados[key].dataValues.password_salt;
                delete maestros_filtrados[key].dataValues.password_hash;
            }
            res.json(maestros_filtrados);
            return;
        }
        for (const key in maestros) {
            delete maestros[key].dataValues.password_salt;
            delete maestros[key].dataValues.password_hash;
        }
        res.status(200).json(maestros);
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
        return err;
    }
}

//Obtener un Maestro
//Petición no requiere un body pero sí un id en parámetros
async function obtenerMaestro(req, res) {
    const id = req.params.id;
    try { //Evitamos mostrar la contraseña por temas de seguridad
        const maestro = await Maestro.findByPk(id);
        if (!maestro) {
            res.status(404).json({ error: `Maestro ${id} no existe` });
            return;
        }
        delete maestro.dataValues.password_salt;
        delete maestro.dataValues.password_hash;
        res.status(200).json(maestro);
        return;
    } catch (err) {
        if (err.parent != null) { //Existen dos tipos de errores posibles en la petición
            return res.status(400).json({
                error: err.parent.detail, id: id
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message, id: id
            });
        }
        return err;
    }
}

//Obtener una actividad del Maestro
//Petición no requiere un body pero sí un id del Maestro y de la Actividad
async function detalleActividades(req, res) {
    const idMaestro = req.params.id;
    const idActividad = req.params.idActividad
    try { //Evitamos mostrar la contraseña por temas de seguridad
        if (idActividad === undefined) {
            const maestro = await Maestro.findByPk(idMaestro, {
                include: {
                    model: Actividad
                }
            });
            delete maestro.dataValues.password_salt;
            delete maestro.dataValues.password_hash;
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
        delete maestro.dataValues.password_salt;
        delete maestro.dataValues.password_hash;
        res.status(200).json(maestro);
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
        return err;
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