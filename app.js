/* APP: Configuraciones principales */
//Configuración de ambiente (ENV)
require("dotenv").config()

//Configuración de Passport
require('./config/passport');

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

//Home rute... Renderizar html en un futuro
app.get('/', (req,res)=>{
    return res.redirect('/api/v1/')
})

//Configuración de rutas
app.use('/api/v1', routes)

//Catch 404 
app.use(function (req, res, next) {
    res.status(404).json({error: 'Not Found'})
});




//Conexión a la base de datos con try/catch
try {
    sequelize.authenticate();
//    sequelize.sync();
    console.log('La conexion fue exitosa');
} catch (error) {
    console.error('Hubo un problema con la conexión', error);
}


app.listen(process.env.PORT || 3000, () => {
    console.log("Server listing on PORT", process.env.PORT);  //Se agrega el puerto
});