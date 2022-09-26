/* APP: Configuraciones principales */
//Express configuration
const express = require("express");
const sequelize = require('./config/db')
const routes = require('./routes')
const app = express();
app.use(express.json());
app.use('/', routes)

//Body Parser
const bodyParser = require('body-parser');
const { route } = require("./routes/alumno");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Conexión a la base de datos con try/catch
try {
    sequelize.authenticate();
    console.log('La conexion fue exitosa');
} catch (error) {
    console.error('Hubo un problema con la conexión', error);
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});



