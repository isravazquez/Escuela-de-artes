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


//Consulta general
app.get('/alumnos', async(req, res) => {
    // const nombre = req.query.nombre;
    const alumnos = await Alumno.findAll();
    const id = req.query.id;
    console.log(Object.entries(alumnos[0]));
    if (id) {
        let alumnos_filtrados = Object.entries(alumnos).filter(alumno => alumno[0] === id);
        alumnos_filtrados = Object.fromEntries(alumnos_filtrados);
        res.json(alumnos_filtrados);
        return;
    }
    res.json(alumnos);
    return;
    // if (nombre) {   
    //     let alumnos_filtrados = Object.entries(alumnos).filter(alumno => alumno[1].nombre === nombre);
    //     alumnos_filtrados = Object.fromEntries(alumnos_filtrados);
    //     res.json(alumnos_filtrados);
    //  } else {
    //      res.json(alumnos);
    //  }
    //res.json(alumnos);
});

//Consulta por nombre
app.get('/alumnos/:nombre', async(req, res) => { //id
    const alumnos = await Alumno.findAll();
    const nombre = req.params.nombre;
    //console.log(Object.entries(alumnos[0]));
    if (Object.entries(alumnos).filter(alumno => alumno[1].nombre === nombre)) {    //Con nombre si funciona
        let alumnos_filtrado = Object.entries(alumnos).filter(alumno => alumno[1].nombre === nombre);
        alumnos_filtrado = Object.fromEntries(alumnos_filtrado);
        res.json(alumnos_filtrado);
    } else {
        res.json(alumnos);
    }
});

//Agregar - Se agrega por id debido al formato de la informacion
 app.post('/alumnos/:id', async(req, res) => {  //sin id
    const alumnos = await Alumno.findAll();
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    //alumnos[id.toString()] = data;
    const alumnoNuevo = Object.assign({}, data);
    Alumno.create(alumnoNuevo);

    res.status(201).json(alumnos[id.toString()]);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});



