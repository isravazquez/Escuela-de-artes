## APIS - SISTEMA ESCOLAR
RESTful - JSON

#### RESEÑAS

APIS para la gestión de las reseñas para que el alumno pueda dar comentarios específicos y dar una calificación al comentario de acuerdo a qué tan satisfecho o no está en la actividad.

Se podrán dar de alta tantas reseñas como desee, así como consultar, actualizar o eliminar reseñas existentes.

##### Crear  Reseña
Da de alta una reseña para un alumno-actividad otorgando una calificación y un comentario.

1. **Método:**
POST

2. **URL del WebService**
> http://localhost:3000/v1/resenas

3. **Parámetros**

4. **LayOut alta WebService en Body**

|  Elemento | Descripción  |Obligatorio   |
| ------------ | ------------ | ------------ |
| alumno_id  | id del alumno | Si|
|actividad_id| id de la actividad|Si|
|calificación|calificacion reseña|Si|
|comentario|comentario reseña| Si|
** *Ejemplo Body* **
{
	"alumno_id": 13,
	"actividad_id": 7,
	"calificacion": 9,
	"comentario": "Pruebas reseñas2"
}

5. **Respuesta**
En caso de que la respuesta sea exitosa, el web service retorenará el mensaje de ** *201 CREATED* **. en caso contrario, se observará un mensaje de error con la información del error o faltante.
también regresará información con los datos dados de alta en JSON el status y el cuerpo de la reseña.

**Ejemplo Alta WebService**
{
	"status": "reseña creada con éxito",
	"resena": {
		"id": 83,
		"alumno_id": 15,
		"actividad_id": 7,
		"calificacion": 9,
		"comentario": "Pruebas reseñas2"
	}
}

##### Actualizar Reseña

Actualiza una reseña de acuerdo al id de la reseña existente modificando los datos del cuerpo de la reseña a otro valor.
Únicamente cambiará los datos que se coloquen en el cuerpo de la reseña (Body).

Al colocar un dato, este deberá ser obligatorio excepto en calificación que puede ser 0 y comentarios que puede estar vacío.
1. **Método:**
PATCH

2. **URL del WebService**
> http://localhost:3000/v1/resenas

3. **Parámetros**
**id.**- id de la reseña
> * ejemplo: *
http://localhost:3000/v1/resenas/20


4. **LayOut modificar WebService en Body**

|  Elemento | Descripción  |Obligatorio   |
| ------------ | ------------ | ------------ |
| alumno_id  | id del alumno | Si, solo si se coloca|
|actividad_id| id de la actividad|Si, solo si se coloca|
|calificación|calificacion reseña|Si, solo si se coloca|
|comentario|comentario reseña| Si, solo si se coloca|
** * Ejemplo Body * **
{
	"alumno_id": 13,
	"actividad_id": 7,
	"calificacion": 5,
	"comentario": "comentario 1"
}

5. **Respuesta**
En caso de que la respuesta sea exitosa, el web service retorenará el mensaje de ** *200 OK* **. en caso contrario, se observará un mensaje de error con la información del error o faltante.
también regresará información con los datos modificados en JSON .

**Ejemplo Alta WebService**
{
	"id": 20,
	"alumno_id": 13,
	"actividad_id": 7,
	"calificacion": 5,
	"comentario": "comentario 1"
}
