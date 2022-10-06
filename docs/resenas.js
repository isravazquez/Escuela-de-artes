//Crear reseña
/**
 * @swagger
 * components:
 *  schemas:
 *    Resena:
 *      type: object
 *      properties:
 *        alumno_id:
 *          type: integer
 *          description: id del alumno.
 *        actividad_id:
 *          type: integer
 *          description: id de la actividad.
 *        calificacion:
 *          type: integer
 *          description: 'calificación dada por el alumno, valores válidos: 0-5.'
 *        comentario:
 *          type: text
 *          description: comentario del alumno.
 *      required:
 *        - alumno_id
 *        - actividad_id
 *        - calificacion
 *        - comentario
 *      example:
 *        alumno_id: 5
 *        actividad_id: 8
 *        calificacion: 4
 *        comentario: hace falta mas material para la actividad          
 */

/**
 * @swagger
 * /v1/resenas:
 *  post:
 *    summary: crea una nueva reseña
 *    tags: [Resena]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Resena'
 *    responses:
 *      201:
 *        description: nueva reseña fue creada!
 */

//Actualizar reseña
/**
 * @swagger
 * /v1/resenas/{id}:
 *  patch:
 *    summary: actualizar una reseña
 *    tags: [Resena]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id de la reseña
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Resena'
*    responses:
 *      200:
 *        description: reseña actualizada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Resena'
 *      404:
 *        description: reseña no encontrada        
 */

//Eliminar reseña
/**
 * @swagger
 * /v1/resenas/{id}:
 *  delete:
 *    summary: eliminar una reseña
 *    tags: [Resena]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id de la reseña
 *    responses:
 *      200:
 *        description: reseña eliminada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Resena'
 *      404:
 *        description: reseña no encontrada        
 */

//Obtener todas las reseñas
//filtrado de reseñas por alumno o actividad por el body
/**
 * @swagger
 * /v1/resenas:
 *  get:
 *    summary: obtener todas las reseñas
 *    tags: [Resena]
 *    parameters:
 *      - in: query
 *        name: alumno_id
 *        schema:
 *          type: integer
 *        required: false
 *        description: id del alumno
 *      - in: query
 *        name: actividad_id
 *        schema:
 *          type: integer
 *        required: false
 *        description: id de la actividad
 *    responses:
 *      200:
 *        description: Todas las reseñas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Resena'
 */

//Obtener reseña por id
/**
 * @swagger
 * /v1/resenas/{id}:
 *  get:
 *    summary: obtiene una reseña
 *    tags: [Resena]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id de la reseña
 *    responses:
 *      200:
 *        description: Todas las reseñas
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Resena'
 *      404:
 *        description: reseña no encontrada        
 */
