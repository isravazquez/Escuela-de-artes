
const accesoPermitido = {
    soloAdmin: function(req, res, next) {
        const userType = req.auth.type;
        if(userType !== 3) return res.status(401).json({error: "Acceso no autorizado"})
        next()
    },
    adminYMaestro: function(req, res, next) {
        const userType = req.auth.type;
        if(userType === 1 ) return res.status(401).json({error: "Acceso no autorizado"})
        next()
    },
    adminMaestroYAlumnoId: function(req, res, next) {
        const userType = req.auth.type;
        const id = req.auth.id;
        if(userType === 1 && id !== req.params.id ) return res.status(401).json({error: "Acceso no autorizado"})
        next()
    },
    adminYAlumno: function(req, res, next) {
        const userType = req.auth.type;
        if(userType === 2 ) return res.status(401).json({error: "Acceso no autorizado"})
        next()
    },
    adminYMaestroId: function(req, res, next) {
        const userType = req.auth.type;
        const id = req.auth.id;
        if(userType === 1 ) return res.status(401).json({error: "Acceso no autorizado"})
        if(userType === 2 && id !== req.params.id ) return res.status(401).json({error: "Acceso no autorizado"})
        next()
    }
}

module.exports = accesoPermitido;