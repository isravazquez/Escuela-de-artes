# Escuela-de-artes

>Proyecto Final del Modulo 2: Fundamentos de Backend Santander 2022 elaborado por el equipo 14.

## 📋 API

#### Apis escuela de Artes
Apis para gestionar las actividades de la escuela de artes en donde se podrá registrar un alumno e inscribirse a una actividad, dar mantenimiento a las actividades, registrarse un maestro y asignarse a una actividad, el alumno podrá captrar reseñas y dar una calificación en la reseña

El desarrollo de las apis está pensado para ser gestionado por administradores del sistema y restringir las operaciones de creaar o elimiminar a los alumnos.

#### Características
- Las Apis fuero desarrolladas con RestFul
- Pra consumir las apis es necesario un token de acceso (ver la sección de autentificación)
- La API e encuentra publicada en https://apparteycultura.herokuapp.com/api/v1
- Para puebas se puede ejecutar en http://localhost:3000/api/v1

## Autentificación
Para la generación del token, proporcionar:
- Tipo de acceso:
    1.- alumno
    2,. maestro
    3.- administrador

**ejemplo:**
{
	"type": 3,
	"email": "juanPerez@email.com",
	"password": "password"
}

Dependiendo del tipo de acceso, se generará el token y tendran accesos diferetes a las APis de acuerdo a los accesos asignados
Únicamente los adminstradores podrán podran tener acceso a todas la API's del sistema.

Para la generación del token se deberá ejecutar la API: 
http://apparteycultura.herokuapp.com/api/v1//logIn

y proporcionar en el cuerpo le JSON del ejemplo anterior

#### APIs y Reglas de acceso
La siguiente lista muestra las APIs esxistentes y el tipo de acceso que se tiene dependiendo de que si es un admonostrador, maestro o alumno.

		Tipos de Acceso			
Api's	Método	Admin	Maestro	Alumno	Comentarios
api/Alumnos	POST	Si	No	No	Alta de Alumnos
api/Alumnos/<id>	PATH	Si	No	No	Modificación Alumno
api/Alumnos?id	DELETE	Si	No	No	Eliminación Alumno
api/Alumnos	GET	Si	Si	No	Consulta Alumnos / filtrado por id Alumno o idActividad
api/Alumnos?id	GET	Si	Si	Si *	Consulta de un alumno
api/<id>/inscripciones/<idInscripción>	GET	SI	SI	Si *	detalle de inscripciones de cada alumno
Api/:id/resenas/:idResena?	GET	Si	SI	SI *	detalle de reseñas de cada alumno
					* Solo con su id del alumno
Api/Actividades	POST	Si	No	No	Alta de Actividades
Api/Actividades?id	PATH	Si	No	No	Actualización de Actividades
Api/Actividades?id	DELETE	Si	No	No	Eliminación de Actividades
Api/Actividades	GET	sI	Si	Si	Consulta todas las actividaes / Sin autentificación
Api/Actividades?id	GET	Si	Si	Si	Consulta una actividad / Sin Autentificación
Api/:id/inscripciones/:idInscripción	GET	Si	No	No	Consulta detalle inscripciones por actividad
Api/:id/resenas/:idResena?	GET	Si	No	No	Consulta a detalle reseñas por actividad
					
Api/Inscripciones	POST	Si	No	No	Alta de inscripciones
Api/Inscripciones?id	PATH	Si	No	No	Modificación de inscripciones
Api/Inscripciones?id	DELETE	Si	No	No	Eliminación de inscripciones
Api/Inscripciones	GET	Si	No	No	Consulta de Inscripciones
Api/Inscripciones?id	GET	Si	No	No	Consulta de una inscripción
					
Api/Maestros	POST	Si	No	No	Alta de Maestros
Api/Maestros?id	PATH	Si	No	No	Modificación de Maestros
Api/Maestros?id	DELETE	Si	No	No	Eliminación de Maestros
Api/Maestros	GET	Si	No	No	Consulta de Maestros
Api/Maestros/id	GET	sI	Si **	No	Consulta de un Maestro
Api(Maestros:id/actividades/:idActividad?	GET	Si	Si **	No	Consulta a detalle de maestros por actividad
					** Solo e id del maestrro autentificado
Api/Resenas	POST	Si		Si	Alta de reseñas
Api/Resenas?id	PATH	Si		Si	Modificación de reseñas
Api/Resenas?id	DELETE	Si		Si	Eliminación de reseñas
Api/Resenas	GET	Si	Si	Si	Consulta de reseñas
Api/Resenas?id	GET	Si	Si	Si	Consulta de una reseña




-------
[`Página principal`](../README.md)
