/* APP: Configuraciones principales */
//Express configuration
const express = require("express");
//Sequelize Configuration
const sequelize = require('./config/db')
//Routes require
const routes = require('./routes')

//Middlewares
const auth = require('./config/auth');


//App puesta en marcha
const app = express();

//Configuración para los métodos POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Auth Opcional Middleware
app.use(auth.optional);

//Configuración de rutas
app.use('/v1', routes)



//Conexión a la base de datos con try/catch
try {
    sequelize.authenticate();
//    sequelize.sync();
    console.log('La conexion fue exitosa');
} catch (error) {
    console.error('Hubo un problema con la conexión', error);
}


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});