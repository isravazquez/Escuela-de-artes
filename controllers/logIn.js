const Alumno = require('../models/Alumno')
const Maestro = require('../models/Maestro')
const Administrador = require('../models/Administrador');


async function logIn(req, res) {
    const body = req.body;
    //console.log(body);
    try {
        if (body.type === 1) {
            const alumno = await Alumno.findOne({ where: { email: body.email } })
            //console.log(alumno);
            if (!alumno) {
                res.status(404).json({ error: "email o contraseña incorrectas" })
            }
            if (!Alumno.validarPassword(body.password, alumno.password_salt, alumno.password_hash)) {
                return res.status(404).json({ error: "email o contraseña incorrectas" })
            }
            return res.status(200).json(alumno)
        }

        if (body.type === 2) {
            const maestro = await Maestro.findOne({ where: { email: body.email } })
            //console.log(alumno);
            if (!maestro) {
                res.status(404).json({ error: "email o contraseña incorrectas" })
            }
            if (!Maestro.validarPassword(body.password, maestro.password_salt, maestro.password_hash)) {
                return res.status(404).json({ error: "email o contraseña incorrectas" })
            }
            return res.status(200).json(maestro)
        }

        if (body.type === 3) {
            const administrador = await Administrador.findOne({ where: { email: body.email } })
            //console.log(alumno);
            if (!administrador) {
                res.status(404).json({ error: "email o contraseña incorrectas" })
            }
            if (!Administrador.validarPassword(body.password, administrador.password_salt, administrador.password_hash)) {
                return res.status(404).json({ error: "email o contraseña incorrectas" })
            }
            return res.status(200).json(administrador)
        }
    } catch (error) {

    }



}

module.exports = { logIn }