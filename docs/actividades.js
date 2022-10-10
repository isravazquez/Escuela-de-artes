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
 * api/v1/actividades:
 *  post:
 *    summary: Crear Actividad
 *    description: Dar de alta una Actividad. Requiere autenticación Bearer
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
 *        description: Nueva Actividad fue creada!
 *      400:
 *        description: Error en la petición
 */

//Actualizar actividad
/**
 * @swagger
 * api/v1/actividades/{id}:
 *  patch:
 *    summary: Actualizar Actividad
 *    description: Actualizar datos de una Actividad. Requiere autenticación Bearer
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
 *        description: Actividad actualizada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Actividad'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Actividad no encontrada      
 */

//Eliminar actividad
/**
 * @swagger
 * api/v1/actividades/{id}:
 *  delete:
 *    summary: Eliminar Actividad
 *    description: Dar de baja una Actividad. Requiere autenticación Bearer
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
 *        description: Actividad eliminada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Actividad'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Actividad no encontrada   
 */

//Obtener todas las actividades
//filtrado de actividades por nombre, maestro_id o costo
/**
 * @swagger
 * api/v1/actividades:
 *  get:
 *    summary: Obtener Actividades
 *    description: Obtener todas las Actividades. Requiere autenticación Bearer
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
 *        description: Todas las Actividades
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Actividad'
 *      400:
 *        description: Error en la petición
 *      404: 
 *        description: Lista de Actividades vacía
 */

//Obtener actividad por id
/**
 * @swagger
 * api/v1/actividades/{id}:
 *  get:
 *    summary: Obtener Actividad
 *    description: Obtener una Actividad por ID. Requiere autenticación Bearer
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
 *        description: Actividad seleccionada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Actividad'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Actividad no encontrada      
 */
