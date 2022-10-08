//Require de Modelo principal
const Alumno = require('../models/Alumno');
//Require de Modelos auxiliares
const Inscripcion = require('../models/Inscripcion');
const Resena = require('../models/Resena');

//Creación de un Alumno
//Petición requiere un body pero no parámetros 
async function crearAlumno(req, res) {
    const { password: pass, ...alumnoBody } = req.body;
    try { //Evitamos mostrar la contraseña por temas de seguridad
        const password = Alumno.crearPassword(pass);
        const alumnoARegistrar = { ...alumnoBody, ...password };
        const alumno = await Alumno.create(alumnoARegistrar);
        delete alumno.dataValues.password_salt;
        delete alumno.dataValues.password_hash;
        res.status(201).json(alumno);
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, data: alumnoBody
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message, data: alumnoBody
            });
        }
        return err;
    }
}

//Actualizar datos de un Alumno
//Petición requiere un body y un id en parámetros
async function actualizarAlumno(req, res) {
    const id = req.params.id;
    const cambioSolicitado = req.body;
    try { //Evitamos mostrar la contraseña por temas de seguridad
        const alumno = await Alumno.findByPk(id);
        if (!alumno) {
            res.status(404).json({ error: `Alumno ${id} no existe` });
            return;
        }
        await Alumno.update(cambioSolicitado, { where: { id } });
        const alumno_actualizado = await Alumno.findByPk(id);
        delete alumno_actualizado.dataValues.password_salt;
        delete alumno_actualizado.dataValues.password_hash;
        res.status(200).json(alumno_actualizado);
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

//Eliminar un Alumno
//Petición no requiere un body pero sí un id en parámetros
async function eliminarAlumno(req, res) {
    const id = req.params.id;
    try { //Evitamos mostrar la contraseña por temas de seguridad
        const alumno = await Alumno.findByPk(id);
        if (!alumno) {
            res.status(404).json({ error: `Alumno ${id} no existe` });
            return;
        }
        await Alumno.destroy(
            { where: { id } }
        );
        delete alumno.dataValues.password_salt;
        delete alumno.dataValues.password_hash;
        res.status(200).json({ status: `id alumno ${id} borrada con éxito`, alumno });
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail, id: id, data: alumno
            });
        }
        if (err.errors != null) {
            return res.status(400).json({
                error: err.errors[0].message, id: id, data: alumno
            });
        }
        return err;
    }
}

//Obtener todos los Alumnos
//Petición no requiere un body ni parámetros, pero acepta queries para un filtrado
async function obtenerAlumnos(req, res) {
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
        const alumnos = await Alumno.findAll({ order: ['id'] });
        //Evitamos mostrar la contraseña por temas de seguridad
        if (!alumnos) {
            res.status(404).json({ error: 'Lista de alumnos vacia' });
            return;
        }
        if (nombre) { 
            let alumnos_filtrados = Object.entries(alumnos).filter(alumno => alumno[1].nombre === nombre);
            alumnos_filtrados = Object.fromEntries(alumnos_filtrados);
            for (const key in alumnos_filtrados) {
                delete alumnos_filtrados[key].dataValues.password_salt;
                delete alumnos_filtrados[key].dataValues.password_hash;
            }
            res.json(alumnos_filtrados);
            return;
        }
        if (apellido) {
            let alumnos_filtrados = Object.entries(alumnos).filter(alumno => alumno[1].apellido === apellido);
            alumnos_filtrados = Object.fromEntries(alumnos_filtrados);
            for (const key in alumnos_filtrados) {
                delete alumnos_filtrados[key].dataValues.password_salt;
                delete alumnos_filtrados[key].dataValues.password_hash;
            }
            res.json(alumnos_filtrados);
            return;
        }
        if (email) {
            let alumnos_filtrados = Object.entries(alumnos).filter(alumno => alumno[1].email === email);
            alumnos_filtrados = Object.fromEntries(alumnos_filtrados);
            for (const key in alumnos_filtrados) {
                delete alumnos_filtrados[key].dataValues.password_salt;
                delete alumnos_filtrados[key].dataValues.password_hash;
            }
            res.json(alumnos_filtrados);
            return;
        }
        for (const key in alumnos) {
            delete alumnos[key].dataValues.password_salt;
            delete alumnos[key].dataValues.password_hash;
        }
        res.status(200).json(alumnos);
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

//Obtener un Alumno
//Petición no requiere un body pero sí un id en parámetros
async function obtenerAlumno(req, res) {
    const id = req.params.id;
    try { //Evitamos mostrar la contraseña por temas de seguridad
        const alumno = await Alumno.findByPk(id);
        if (!alumno) {
            res.status(404).json({ error: `Alumno ${id} no existe` });
            return;
        }
        delete alumno.dataValues.password_salt;
        delete alumno.dataValues.password_hash;
        res.status(200).json(alumno);
        return;
    } catch (err) { //Existen dos tipos de errores posibles en la petición
        if (err.parent != null) {
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

//Obtener una inscripción del Alumno
//Petición no requiere un body pero sí un id del Alumno y de la Inscripción
async function detalleInscripciones(req, res) {
    const idAlumno = req.params.id;
    const idInscripcion = req.params.idInscripcion
    try { //Evitamos mostrar la contraseña por temas de seguridad
        if (idInscripcion === undefined) {
            const alumno = await Alumno.findByPk(idAlumno, {
                include: {
                    model: Inscripcion
                }
            });
            delete alumno.dataValues.password_salt;
            delete alumno.dataValues.password_hash;
            res.status(200).json(alumno);
            return;
        }
        const alumno = await Alumno.findByPk(idAlumno, {
            include: {
                model: Inscripcion,
                where: {
                    id: idInscripcion
                }
            }
        });
        delete alumno.dataValues.password_salt;
        delete alumno.dataValues.password_hash;
        res.status(200).json(alumno);
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

//Obtener una reseña del Alumno
//Petición no requiere un body pero sí un id del alumno y de la Reseña
async function detalleResenas(req, res) {
    const idAlumno = req.params.id;
    const idResena = req.params.idResena
    try { //Evitamos mostrar la contraseña por temas de seguridad
        if (idResena === undefined) {
            const alumno = await Alumno.findByPk(idAlumno, {
                include: {
                    model: Resena
                }
            });
            delete alumno.dataValues.password_salt;
            delete alumno.dataValues.password_hash;
            res.status(200).json(alumno);
            return;
        }
        const alumno = await Alumno.findByPk(idAlumno, {
            include: {
                model: Resena,
                where: {
                    id: idResena
                }
            }
        });
        delete alumno.dataValues.password_salt;
        delete alumno.dataValues.password_hash;
        res.status(200).json(alumno);
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
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno,
    obtenerAlumnos,
    obtenerAlumno,
    detalleInscripciones,
    detalleResenas
}