//Crear actividad
/**
 * @swagger
 * components:
 *  schemas:
 *    Actividad:
 *      type: object
 *      properties:
 *        maestro_id:
 *          type: integer
 *          description: id del maestro.
 *        nombre:
 *          type: text
 *          description: nombre de la actividad.
 *        costo:
 *          type: integer
 *          description: costo de la actividad
 *        descripcion:
 *          type: text
 *          description: descripción de la actividad.
 *        dias:
 *          type: text
 *          description: días de la actividad.
 *        horario:
 *          type: text
 *          description: horario de la actividad.
 *      required:
 *        - maestro_id
 *        - nombre
 *        - costo
 *        - descripcion
 *        - dias
 *        - horario
 *      example:
 *        maestro_id: 6
 *        nombre: danza
 *        costo: 10500
 *        descripcion: danza contemporanea
 *        dias: lunes, miércoles,jueves
 *        horario: 10:00 AM - 11:00 AM        
 */

/**
 * @swagger
 * /v1/actividades:
 *  post:
 *    summary: da de alta una actividad
 *    tags: [Actividad]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Actividad'
 *    responses:
 *      201:
 *        description: nueva actividad fue creada!
 */

//Actualizar actividad
/**
 * @swagger
 * /v1/actividades/{id}:
 *  patch:
 *    summary: actualizar datos actividad
 *    tags: [Actividad]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id de la actividad
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Actividad'
*    responses:
 *      200:
 *        description: actividad actualizada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Actividad'
 *      404:
 *        description: actividad no encontrada      
 */

//Eliminar actividad
/**
 * @swagger
 * /v1/actividades/{id}:
 *  delete:
 *    summary: eliminar una actividad
 *    tags: [Actividad]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id de la actividad
 *    responses:
 *      200:
 *        description: actividad eliminada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Actividad'
 *      404:
 *        description: actividad no encontrada   
 */

//Obtener todas las actividades
//filtrado de actividades por nombre, maestro_id o costo
/**
 * @swagger
 * /v1/actividades:
 *  get:
 *    summary: obtener todas las actividades
 *    tags: [Actividad]
 *    parameters:
 *      - in: query
 *        name: nombre
 *        schema:
 *          type: text
 *        required: false
 *        description: nombre de la actividad
 *      - in: query
 *        name: maestro_id
 *        schema:
 *          type: integer
 *        required: false
 *        description: id del maestro
 *      - in: query
 *        name: costo
 *        schema:
 *          type: text
 *        required: false
 *        description: costo de la actividad
 *    responses:
 *      200:
 *        description: Todas las actividades
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Actividad'
 */

//Obtener actividad por id
/**
 * @swagger
 * /v1/actividades/{id}:
 *  get:
 *    summary: obtiene una actividad
 *    tags: [Actividad]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id de la actividad
 *    responses:
 *      200:
 *        description: Todas las actividades
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Actividad'
 *      404:
 *        description: actividad no encontrada      
 */
