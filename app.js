/* APP: Configuraciones principales */
//Express configuration
const express = require("express");
const app = express();

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;


//sequelize para las consultas
const sequelize = require('./config/db') //Eliminar esta linea de este sitio

/* Prueba para la conexión a la BD
Eliminar después de la prueba
*/
//Conexión a la base de datos con try/catch
try {
    sequelize.authenticate();
    console.log('La conexion fue exitosa');
} catch (error) {
    console.error('Hubo un problema con la conexión', error);
}

const Alumno = require('./models/Alumno') //Eliminar esta linea de este sitio
const Maestro = require('./models/Maestro') //Eliminar esta linea de este sitio
const Actividad = require('./models/Actividad') //Eliminar esta linea de este sitio
const Inscripcion = require('./models/Inscripcion') //Eliminar esta linea de este sitio
const Resena = require('./models/Resena') //Eliminar esta linea de este sitio


//Consulta general (alumnos)
app.get('/alumnos', async (req, res) => {
    const nombre = req.query.nombre;
    const apellido = req.query.apellido;
    const email = req.query.email;
    const alumnos = await Alumno.findAll();
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
});

//Consulta invidual por id  (alumnos)
app.get('/alumnos/:id', async (req, res) => {
    const id = req.params.id;
    const alumno = await Alumno.findByPk(id);
    if (!alumno) {
        res.status(404).json({ error: 'Alumno no encontrado' });
        return;
    }
    res.status(200).json(alumno);
    return;
});

//Agregar   (alumnos)
app.post('/alumnos', async (req, res) => {  //Funciona sin mandar un id en el header pero en el body de la peticion si debe de llevar un valor forzozamente el id
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
});

//Actualizar    (alumnos)
app.patch('/alumnos/:id', async (req, res) => {
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
});

//Eliminar (alumnos)
app.delete('/alumnos/:id', async (req, res) => {
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
});

//Consulta general (maestros)
app.get('/maestros', async (req, res) => {
    const nombre = req.query.nombre;
    const apellido = req.query.apellido;
    const email = req.query.email;
    const maestros = await Maestro.findAll();
    if (!maestros) {
        res.status(404).json({ error: 'Lista de maestros vacia' });
        return;
    } else if (nombre) {
        let maestros_filtrados = Object.entries(maestros).filter(maestro => maestro[1].nombre === nombre);
        maestros_filtrados = Object.fromEntries(maestros_filtrados);
        res.json(maestros_filtrados);
        return;
    } else if (apellido) {
        let maestros_filtrados = Object.entries(maestros).filter(maestro => maestro[1].apellido === apellido);
        maestros_filtrados = Object.fromEntries(maestros_filtrados);
        res.json(maestros_filtrados);
        return;
    } else if (email) {
        let maestros_filtrados = Object.entries(maestros).filter(maestro => maestro[1].email === email);
        maestros_filtrados = Object.fromEntries(maestros_filtrados);
        res.json(maestros_filtrados);
        return;
    }
    res.status(200).json(maestros);
    return;
});

//Consulta invidual por id  (maestros)
app.get('/maestros/:id', async (req, res) => {
    const id = req.params.id;
    const maestro = await Maestro.findByPk(id);
    if (!maestro) {
        res.status(404).json({ error: 'Maestro no encontrado' });
        return;
    }
    res.status(200).json(maestro);
    return;
});

//Agregar   (maestros)
app.post('/maestros', async (req, res) => {  //Funciona sin mandar un id en el header pero en el body de la peticion si debe de llevar un valor forzozamente el id
    const body = req.body;
    const verificacionEmail = await Maestro.findOne({ where: { email: body.email } });
    const verificacionNombre = await Maestro.findOne({ where: { nombre: body.nombre, apellido: body.apellido } });

    if (verificacionEmail || verificacionNombre) {
        res.status(404).json({ error: 'Maestro ya registrado' }); //No se si el estatus 404 es correcto para este error
        return;
    }
    const maestro = await Maestro.create(body);
    res.status(201).json(maestro);
    return;
});

//Actualizar    (maestros)
app.patch('/maestros/:id', async (req, res) => {
    const id = req.params.id;
    const cambioSolicitado = req.body;
    const maestro = await Maestro.findByPk(id);
    if (!maestro) {
        res.status(404).json({ error: 'Maestro no encontrado' });
        return;
    }
    await Maestro.update(cambioSolicitado, { where: { id } });
    const maestro_actualizado = await Maestro.findByPk(id);
    res.status(200).json(maestro_actualizado);
    return;
});

//Eliminar (maestros)
app.delete('/maestros/:id', async (req, res) => {
    const id = req.params.id;
    const maestro = await Maestro.findByPk(id);
    if (!maestro) {
        res.status(404).json({ error: 'Maestro no encontrado' });
        return;
    }
    const deleted = Maestro.destroy(
        { where: { id } }
    );
    res.status(200).json(deleted);
    return;
});

//Consulta general (actividades)
app.get('/actividades', async (req, res) => {
    const nombre = req.query.nombre;
    const maestro_id = req.query.maestro_id;
    const costo = req.query.costo;
    const actividades = await Actividad.findAll();
    if (!actividades) {
        res.status(404).json({ error: 'Lista de actividades vacia' });
        return;
    } else if (nombre) {
        let actividades_filtradas = Object.entries(actividades).filter(actividad => actividad[1].nombre === nombre);
        actividades_filtradas = Object.fromEntries(actividades_filtradas);
        res.json(actividades_filtradas);
        return;
    } else if (maestro_id) {
        let actividades_filtradas = Object.entries(actividades).filter(actividad => actividad[1].maestro_id === maestro_id);
        actividades_filtradas = Object.fromEntries(actividades_filtradas);
        res.json(actividades_filtradas);
        return;
    } else if (costo) {
        let actividades_filtradas = Object.entries(actividades).filter(actividad => actividad[1].costo === costo);
        actividades_filtradas = Object.fromEntries(actividades_filtradas);
        res.json(actividades_filtradas);
        return;
    }
    res.status(200).json(actividades);
    return;
});

//Consulta invidual por id  (actividades)
app.get('/actividades/:id', async (req, res) => {
    const id = req.params.id;
    const actividad = await Actividad.findByPk(id);
    if (!actividad) {
        res.status(404).json({ error: 'Actividad no encontrada' });
        return;
    }
    res.status(200).json(actividad);
    return;
});

//Agregar   (actividades)
app.post('/actividades', async (req, res) => {  //Funciona sin mandar un id en el header pero en el body de la peticion si debe de llevar un valor forzozamente el id
    const body = req.body;
    const verificacionNombre = await Actividad.findOne({ where: { nombre: body.nombre } });

    if (verificacionNombre) {
        res.status(404).json({ error: 'Actividad ya registrada' }); //No se si el estatus 404 es correcto para este error
        return;
    }
    const actividad = await Actividad.create(body);
    res.status(201).json(actividad);
    return;
});

//Actualizar    (actividades)
app.patch('/actividades/:id', async (req, res) => {
    const id = req.params.id;
    const cambioSolicitado = req.body;
    const actividad = await Actividad.findByPk(id);
    if (!actividad) {
        res.status(404).json({ error: 'Actividad no encontrada' });
        return;
    }
    await Actividad.update(cambioSolicitado, { where: { id } });
    const actividad_actualizada = await Actividad.findByPk(id);
    res.status(200).json(actividad_actualizada);
    return;
});

//Eliminar (actividades)
app.delete('/actividades/:id', async (req, res) => {
    const id = req.params.id;
    const actividad = await Actividad.findByPk(id);
    if (!actividad) {
        res.status(404).json({ error: 'Actividad no encontrada' });
        return;
    }
    const deleted = Actividad.destroy(
        { where: { id } }
    );
    res.status(200).json(deleted);
    return;
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});



