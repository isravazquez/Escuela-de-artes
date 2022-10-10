
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
 * api/v1/inscripciones:
 *  post:
 *    summary: Crear Inscripción
 *    description: Dar de alta una Inscripción. Requiere autenticación Bearer
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
 *        description: Nueva Inscripción fue creada!
 *      400:
 *        description: Error en la petición
 */

//Actualizar inscripción
/**
 * @swagger
 * api/v1/inscripciones/{id}:
 *  patch:
 *    summary: Actualizar Inscripción
 *    description: Actualizar datos de una Inscripción. Requiere autenticación Bearer
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
 *        description: Inscripción actualizada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Inscripcion'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Inscripción no encontrada        
 */

//Eliminar inscripcion
/**
 * @swagger
 * api/v1/inscripciones/{id}:
 *  delete:
 *    summary: Eliminar Inscripcion
 *    description: Dar de baja una Inscripción. Requiere autenticación Bearer
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
 *        description: Inscripcion eliminada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Inscripcion'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Inscripción no encontrada        
 */

//Obtener todas las inscripciones
//filtrado de inscripcones por alumno o actividad por el body
/**
 * @swagger
 * api/v1/inscripciones:
 *  get:
 *    summary: Obtener Inscripciones
 *    description: Obtener todas las Inscripciones. Requiere autenticación Bearer
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
 *        description: Todas las Inscripciones
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Inscripcion'
 *      400:
 *        description: Error en la petición
 *      404: 
 *        description: Lista de Actividades vacía
 */

//Obtener inscripción por id
/**
 * @swagger
 * api/v1/inscripciones/{id}:
 *  get:
 *    summary: Obtener Inscripción
 *    description: Obtener una Inscripción por ID. Requiere autenticación Bearer
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
 *        description: Inscripción seleccionada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Inscripcion'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Inscripción no encontrada        
 */
