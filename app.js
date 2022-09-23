import { Sequelize, DataTypes } from 'sequelize';
import express, { json } from 'express';

/* 
CONEXIÓN A LA BASE DE DATOS
*/

// Intento uno: (Eliminar)
//const sequelize = new Sequelize('postgres://yhrrbfwgzphhll:dbf6ddf01cbcd368a3b7af3fd8578f36a863a71829c6f66222698eec2827f87c@ec2-35-170-146-54.compute-1.amazonaws.com:5432/da604cdd0trbqn')

// Intento dos: (Eliminar)
/* const sequelize = new Sequelize(
    'da604cdd0trbqn',
    'yhrrbfwgzphhll',
    'dbf6ddf01cbcd368a3b7af3fd8578f36a863a71829c6f66222698eec2827f87c',
    {
        host: 'ec2-35-170-146-54.compute-1.amazonaws.com',
        dialect: 'postgres',
        native: true,
        ssl: true
    }
); */

//Intento tres: (funciona)
const sequelize = new Sequelize(
    {
        database: 'da604cdd0trbqn',
        username: 'yhrrbfwgzphhll',
        password: 'dbf6ddf01cbcd368a3b7af3fd8578f36a863a71829c6f66222698eec2827f87c',
        host: 'ec2-35-170-146-54.compute-1.amazonaws.com',
        port: 5432,
        ssl: true,
        dialect: 'postgres',
        dialectOptions: {
            "ssl": { "rejectUnauthorized": false }
        }
    }
);

//Conexión a la base de datos con try/catch
try {
    sequelize.authenticate();
    console.log('La conexion fue exitosa');
} catch (error) {
    console.error('Hubo un problema con la conexión', error);
}

/* 
CREACIÓN DE MODELOS
*/

//Alumno
const Alumno = sequelize.define('Alumno', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    apellido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// Maestro
const Maestro = sequelize.define('Maestro', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    apellido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

//Actividad
const Actividad = sequelize.define('Actividad', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    maestro_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    costo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    dias: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    horario: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

//Inscripción
const Inscripcion = sequelize.define('Inscripcion', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    alumno_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    actividad_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

//Reseña
const Resena = sequelize.define('Resena', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    alumno_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    actividad_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

/* 
ASOCIACIONES
*/

//Alumno
Alumno.hasMany(Inscripcion, {
    foreignKey: 'alumno_id'
})

Alumno.hasMany(Resena, {
    foreignKey: 'alumno_id'
})

//Maestro
Maestro.hasMany(Actividad, {
    foreignKey: 'maestro_id'
})

//Actividad
Actividad.hasMany(Inscripcion, {
    foreignKey: 'actividad_id'
})

Actividad.hasMany(Resena, {
    foreignKey: 'actividad_id'
})

Actividad.belongsTo(Maestro, {
    foreignKey: 'maestro_id'
})

//Inscripción
Inscripcion.belongsTo(Alumno, {
    foreignKey: 'alumno_id'
})

Inscripcion.belongsTo(Actividad, {
    foreignKey: 'actividad_id'
})

//Reseña
Resena.belongsTo(Alumno, {
    foreignKey: 'alumno_id'
})

Resena.belongsTo(Actividad, {
    foreignKey: 'actividad_id'
})

await sequelize.sync();

//Express configuration
const app = express();
const PORT = 3000;
app.use(json());

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