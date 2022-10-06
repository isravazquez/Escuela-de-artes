const Alumno = require('../models/Alumno');
const Inscripcion = require('../models/Inscripcion');
const Resena = require('../models/Resena');

async function crearAlumno(req, res) {
    const body = req.body;
    try {
        const alumno = await Alumno.create(body);
        res.status(201).json(alumno);
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
    }
}

async function actualizarAlumno(req, res) {
    const id = req.params.id;
    const cambioSolicitado = req.body;
    try {
        const alumno = await Alumno.findByPk(id);
        if (!alumno) {
            res.status(404).json({ error: 'Alumno no encontrado' });
            return;
        }
        const estado = await Alumno.update(cambioSolicitado, { where: { id } });
        if (estado[0] === 0) {
            res.status(400).json({ error: 'Alumno no actualizado' })
            return;
        }
        const alumno_actualizado = await Alumno.findByPk(id);
        res.status(200).json(alumno_actualizado);
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
    }
}

async function eliminarAlumno(req, res) {
    const id = req.params.id;
    try {
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
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
    }
}

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
    try {
        const alumnos = await Alumno.findAll({ order: ['id'] });
        if (!alumnos) {
            res.status(404).json({ error: 'Lista de alumnos vacia' });
            return;
        }
        if (nombre) {
            let alumnos_filtrados = Object.entries(alumnos).filter(alumno => alumno[1].nombre === nombre);
            alumnos_filtrados = Object.fromEntries(alumnos_filtrados);
            res.json(alumnos_filtrados);
            return;
        }
        if (apellido) {
            let alumnos_filtrados = Object.entries(alumnos).filter(alumno => alumno[1].apellido === apellido);
            alumnos_filtrados = Object.fromEntries(alumnos_filtrados);
            res.json(alumnos_filtrados);
            return;
        }
        if (email) {
            let alumnos_filtrados = Object.entries(alumnos).filter(alumno => alumno[1].email === email);
            alumnos_filtrados = Object.fromEntries(alumnos_filtrados);
            res.json(alumnos_filtrados);
            return;
        }
        res.status(200).json(alumnos);
        return;
    } catch (error) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
    }
}

async function obtenerAlumno(req, res) {
    const id = req.params.id;
    try {
        const alumno = await Alumno.findByPk(id);
        if (!alumno) {
            res.status(404).json({ error: 'Alumno no encontrado' });
            return;
        }
        res.status(200).json(alumno);
        return;
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
    }
}

async function detalleInscripciones(req, res) {
    const idAlumno = req.params.id;
    const idInscripcion = req.params.idInscripcion
    try {
        if (idInscripcion === undefined) {
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
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
    }

}

async function detalleResenas(req, res) {
    const idAlumno = req.params.id;
    const idResena = req.params.idResena
    try {
        if (idResena === undefined) {
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
    } catch (err) {
        if (err.parent != null) {
            return res.status(400).json({
                error: err.parent.detail
            });
        } else {
            return res.status(400).json({
                error: err.errors[0].message
            });
        }
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