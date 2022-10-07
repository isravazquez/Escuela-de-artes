
//Crear Inscripción
/**
 * @swagger
 * components:
 *  schemas:
 *    Inscripcion:
 *      type: object
 *      properties:
 *        alumno_id:
 *          type: integer
 *          description: id del alumno.
 *        actividad_id:
 *          type: integer
 *          description: id de la actividad.
 *      required:
 *        - alumno_id
 *        - actividad_id
 *      example:
 *        alumno_id: 5
 *        actividad_id: 8
 */

/**
 * @swagger
 * /v1/inscripciones:
 *  post:
 *    summary: crea una inscripción
 *    tags: [Inscripcion]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Inscripcion'
 *    responses:
 *      201:
 *        description: nueva inscripción fue creada!
 */

//Actualizar inscripción
/**
 * @swagger
 * /v1/inscripciones/{id}:
 *  patch:
 *    summary: actualizar una inscripción
 *    tags: [Inscripcion]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id de la inscripción
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Inscripcion'
*    responses:
 *      200:
 *        description: inscripción actualizada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Inscripcion'
 *      404:
 *        description: inscripcion no encontrada        
 */

//Eliminar inscripcion
/**
 * @swagger
 * /v1/inscripciones/{id}:
 *  delete:
 *    summary: eliminar una inscripcion
 *    tags: [Inscripcion]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id de la inscripcion
 *    responses:
 *      200:
 *        description: inscripcion eliminada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Inscripcion'
 *      404:
 *        description: inscripcion no encontrada        
 */

//Obtener todas las inscripciones
//filtrado de inscripcones por alumno o actividad por el body
/**
 * @swagger
 * /v1/inscripciones:
 *  get:
 *    summary: obtener todas las inscripciones
 *    tags: [Inscripcion]
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
 *        description: Todas las inscripciones
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Inscripcion'
 */

//Obtener inscripción por id
/**
 * @swagger
 * /v1/inscripciones/{id}:
 *  get:
 *    summary: obtiene una inscripción
 *    tags: [Inscripcion]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id de la inscripción
 *    responses:
 *      200:
 *        description: Todas las inscripciones
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Inscripcion'
 *      404:
 *        description: inscripción no encontrada        
 */
