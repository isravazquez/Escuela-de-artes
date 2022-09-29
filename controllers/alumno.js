const Alumno = require('../models/Alumno');
const Inscripcion = require('../models/Inscripcion');
const Resena = require('../models/Resena');

async function crearAlumno(req, res) {  //Funciona sin mandar un id en el header pero en el body de la peticion si debe de llevar un valor forzozamente el id
    const body = req.body;
    const verificacionEmail = await Alumno.findOne({ where: { email: body.email } });
    const verificacionNombre = await Alumno.findOne({ where: { nombre: body.nombre, apellido: body.apellido } });

    if (verificacionEmail || verificacionNombre) {
        res.status(404).json({ error: 'Alumno ya registrado' }); //No se si el estatus 404 es correcto para este error
        return;
    }
    const alumno = await Alumno.create(body);
    res.status(201).json(alumno);
    return;
}

async function actualizarAlumno(req, res) {
    const id = req.params.id;
    const cambioSolicitado = req.body;
    const alumno = await Alumno.findByPk(id);
    if (!alumno) {
        res.status(404).json({ error: 'Alumno no encontrado' });
        return;
    }
    await Alumno.update(cambioSolicitado, { where: { id } });
    const alumno_actualizado = await Alumno.findByPk(id);
    res.status(200).json(alumno_actualizado);
    return;
}

async function eliminarAlumno(req, res) {
    const id = req.params.id;
    const alumno = await Alumno.findByPk(id);
    if (!alumno) {
        res.status(404).json({ error: 'Alumno no encontrado' });
        return;
    }
    const deleted = Alumno.destroy(
        { where: { id } }
    );
    res.status(200).json(deleted);
    return;
}

async function obtenerAlumnos(req, res) {
    const nombre = req.query.nombre;
    const apellido = req.query.apellido;
    const email = req.query.email;
    const alumnos = await Alumno.findAll({order: ['id']});
    if (!alumnos) {
        res.status(404).json({ error: 'Lista de alumnos vacia' });
        return;
    } else if (nombre) {
        let alumnos_filtrados = Object.entries(alumnos).filter(alumno => alumno[1].nombre === nombre);
        alumnos_filtrados = Object.fromEntries(alumnos_filtrados);
        res.json(alumnos_filtrados);
        return;
    } else if (apellido) {
        let alumnos_filtrados = Object.entries(alumnos).filter(alumno => alumno[1].apellido === apellido);
        alumnos_filtrados = Object.fromEntries(alumnos_filtrados);
        res.json(alumnos_filtrados);
        return;
    } else if (email) {
        let alumnos_filtrados = Object.entries(alumnos).filter(alumno => alumno[1].email === email);
        alumnos_filtrados = Object.fromEntries(alumnos_filtrados);
        res.json(alumnos_filtrados);
        return;
    }
    res.status(200).json(alumnos);
    return;
}

async function obtenerAlumno(req, res) {
    const id = req.params.id;
    const alumno = await Alumno.findByPk(id);
    if (!alumno) {
        res.status(404).json({ error: 'Alumno no encontrado' });
        return;
    }
    res.status(200).json(alumno);
    return;
}

async function detalleInscripciones(req,res){
    const idAlumno = req.params.id;
    const idInscripcion = req.params.idInscripcion
    if(idInscripcion === undefined){
        const alumno = await Alumno.findByPk(idAlumno, {
            include: {
                model: Inscripcion
            }
        });
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
    res.status(200).json(alumno);
    return;
}

async function detalleResenas(req,res){
    const idAlumno = req.params.id;
    const idResena = req.params.idResena

    if(idResena === undefined){
        const alumno = await Alumno.findByPk(idAlumno, {
            include: {
                model: Resena
            }
        });
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
    res.status(200).json(alumno);
    return;
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