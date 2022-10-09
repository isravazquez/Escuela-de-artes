# Escuela-de-artes

>Proyecto Final del Modulo 2: Fundamentos de Backend Santander 2022 elaborado por el equipo 14.

## 📋 API

#### Apis escuela de Artes
APIs para gestionar las actividades de la escuela de artes.
Se podrá registrar a un alumno e inscribirlo a una actividad, dar mantenimiento a las actividades, registrar a un maestro y asignarlo a una actividad, el alumno podrá capturar reseñas y dar una calificación en la reseña, así como realizar consultas a las actividades a las que está inscrito.

El desarrollo de las apis está pensado para ser gestionado por administradores del sistema y restringir las operaciones de crear y eliminar a los alumnos.

#### Características
- Las Apis fuero desarrolladas con RestFul - JSON
- Pra consumir las apis es necesario un token de acceso (ver la sección de autentificación)
- La API e encuentra publicada en https://apparteycultura.herokuapp.com/api/v1
- Para pruebas se puede ejecutar en http://localhost:3000/api/v1 para esto es ncesario que se cree el ambiente de pruebas en el equipo local bajando la aplicación de https://github.com/isravazquez/Escuela-de-artes.git.

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

Dependiendo del tipo de acceso, se generará el token y se tendran accesos diferetes a las APIs de acuerdo a los accesos asignados
Únicamente los adminstradores podrán tener acceso a todas la APIs del sistema.

Para la generación del token se deberá ejecutar la API: 
http://apparteycultura.herokuapp.com/api/v1//logIn y proporcionar en el cuerpo, el JSON del ejemplo anterior.

#### APIs y Reglas de acceso
La siguiente lista muestra las APIs esxistentes y el tipo de acceso que se tiene dependiendo de que si es un administrador, maestro o alumno.


**Tipos de Acceso**

|API|Método|Admin|Maestro|Alumno|Comentarios|
|-----|-----|-----|-----|-----|-----|
|api/Alumnos|POST|Si|No|No|Alta de Alumnos|
|api/Alumnos/< id >|PATH|Si|No|No|Modificación Alumno|
|api/Alumnos/< id >|DELETE|Si|No|No|Eliminación Alumno|
|api/Alumnos|GET|Si|Si|No|Consulta Alumnos / filtrado por id Alumno o idActividad|
|api/v1/alumnos/< id >|GET|Si|Si|Si|*	Consulta de un alumno|
|api/v1/< id >/inscripciones/<idInscripción>|GET|Si|Si|Si|*	detalle de inscripciones de cada alumno|
|api/v1/< id >/resenas/<idResena>|GET|Si|Si|Si*|detalle de reseñas de cada alumno|
| | | | | |* Solo con su id del alumno|
|api/v1/actividades|POST|Si|No|No|Alta de Actividades|
|api/v1/actividades/< id >|PATH|Si|No|No|Actualización de Actividades|
|api/v1/actividades/< id >|DELETE|Si|No|No|Eliminación de Actividades|
|api/v1/actividades|GET|Si|Si|Si|Consulta todas las actividaes / Sin autentificación|
|api/v1/actividades/< id >|GET|Si|Si|Si|Consulta una actividad / Sin Autentificación|
|api/v1/< id >/inscripciones/<idInscripcion>|GET|Si|No|No|Consulta detalle inscripciones por actividad|
|api/v1/< id >/resenas/<idResena>|GET|Si|No|No|Consulta a detalle reseñas por actividad|
| | | | | | |
|api/v1/inscripciones|POST|Si|No|No|Alta de inscripciones|
|api/v1/inscripciones/< id >|PATH|Si|No|No|Modificación de inscripciones|
|api/v1/inscripciones/< id >|DELETE|Si|No|No|Eliminación de inscripciones|
|api/v1/inscripciones|GET|Si|No|No|Consulta de Inscripciones|
|api/v1/inscripciones/< id >|GET|Si|No|No|Consulta de una inscripción|
| | | | | | |	
|api/v1/maestros|POST|Si|No|No|Alta de Maestros|
|api/v1/maestros/< id >|PATH|Si|No|No|Modificación de Maestros|
|api/v1/maestros/< id >|DELETE|Si|No|No|Eliminación de Maestros|
|api/v1/maestros|GET|Si|No|No|Consulta de Maestros|
|api/v1/maestros/< id >|GET|Si|Si **|No|Consulta de un Maestro|
|api/v1/maestros/< id >/actividades/<idActividad>|GET|Si|Si **|No|Consulta a detalle de maestros por actividad|
| | | | | |** Solo el id del maestrro autentificado|
|api/v1/resenas|POST|Si|No|Si|Alta de reseñas|
|api/v1/resenas/< id >|PATH|Si|No|Si|Modificación de reseñas|
|api/v1/resenas/< id >|DELETE|Si|No|Si|Eliminación de reseñas|
|api/v1/resenas|GET|Si|Si|Si|Consulta de reseñas|
|api/v1/resenas/< id >|GET|Si|Si|Si|Consulta de una reseña|


-------
[`Página principal`](../README.md)
