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
    } catch (error) {

    }



}

module.exports = { logIn }