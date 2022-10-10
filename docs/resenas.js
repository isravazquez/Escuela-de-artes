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
 * api/v1/resenas:
 *  post:
 *    summary: Crear Reseña
 *    description: Dar de alta una Reseña. Requiere autenticación Bearer
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
 *        description: Nueva Reseña fue creada!
 *      400:
 *        description: Error en la petición
 */

//Actualizar reseña
/**
 * @swagger
 * api/v1/resenas/{id}:
 *  patch:
 *    summary: Actualizar Reseña
 *    description: Actualizar datos de una Reseña. Requiere autenticación Bearer
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
 *        description: Reseña actualizada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Resena'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Reseña no encontrada        
 */

//Eliminar reseña
/**
 * @swagger
 * api/v1/resenas/{id}:
 *  delete:
 *    summary: Eliminar Reseña
 *    description: Dar de baja una Reseña. Requiere autenticación Bearer
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
 *        description: Reseña eliminada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Resena'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Reseña no encontrada        
 */

//Obtener todas las reseñas
//filtrado de reseñas por alumno o actividad por el body
/**
 * @swagger
 * api/v1/resenas:
 *  get:
 *    summary: Obtener Reseñas
 *    description: Obtener todas las Reseñas. Requiere autenticación Bearer
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
 *        description: Todas las Reseñas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Resena'
 *      400:
 *        description: Error en la petición
 *      404: 
 *        description: Lista de Reseñas vacía
 */

//Obtener reseña por id
/**
 * @swagger
 * api/v1/resenas/{id}:
 *  get:
 *    summary: Obtener Reseña
 *    description: Obtener una Reseña por ID. Requiere autenticación Bearer
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
 *        description: Reseña seleccionada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Resena'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Reseña no encontrada        
 */
