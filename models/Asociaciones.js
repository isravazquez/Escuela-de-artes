// ASOCIACIONES
Alumno.hasMany(Inscripcion, {
    foreignKey: 'alumno_id'
})

Alumno.hasMany(Resena, {
    foreignKey: 'alumno_id'
})

// ASOCIACIONES
Maestro.hasMany(Actividad, {
    foreignKey: 'maestro_id'
})

// ASOCIACIONES
Inscripcion.belongsTo(Alumno, {
    foreignKey: 'alumno_id'
})

Inscripcion.belongsTo(Actividad, {
    foreignKey: 'actividad_id'
})

// ASOCIACIONES
Actividad.hasMany(Inscripcion, {
    foreignKey: 'actividad_id'
})

Actividad.hasMany(Resena, {
    foreignKey: 'actividad_id'
})

Actividad.belongsTo(Maestro, {
    foreignKey: 'maestro_id'
})

// ASOCIACIONES
Resena.belongsTo(Alumno, {
    foreignKey: 'alumno_id'
})

Resena.belongsTo(Actividad, {
    foreignKey: 'actividad_id'
})
