//Crear maestro
/**
 * @swagger
 * components:
 *  schemas:
 *    Maestro:
 *      type: object
 *      properties:
 *        nombre:
 *          type: text
 *          description: nombre del maestro.
 *        apellido:
 *          type: text
 *          description: apellido del maestro.
 *        email:
 *          type: text
 *          description: email del maestro
 *        password:
 *          type: text
 *          description: password del maestro.
 *      required:
 *        - nombre
 *        - apellido
 *        - email
 *        - password
 *      example:
 *        nombre: jane
 *        apellido: lane
 *        email: lane.lane@beduclass.com
 *        password: w6Dpy55)q21         
 */

/**
 * @swagger
 * api/v1/maestros:
 *  post:
 *    summary: Crear Maestro
 *    description: Dar de alta un Maestro. Requiere autenticación Bearer
 *    tags: [Maestro]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Maestro'
 *    responses:
 *      201:
 *        description: Nuevo Maestro fue creado!
 *      400:
 *        description: Error en la petición
 */

//Actualizar maestro
/**
 * @swagger
 * api/v1/maestros/{id}:
 *  patch:
 *    summary: Actualizar Maestro
 *    description: Actualizar datos de un Maestro. Requiere autenticación Bearer
 *    tags: [Maestro]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id del maestro
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Maestro'
*    responses:
 *      200:
 *        description: Maestro actualizado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Maestro'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Maestro no encontrado   
 */

//Eliminar maestro
/**
 * @swagger
 * api/v1/maestros/{id}:
 *  delete:
 *    summary: Eliminar Maestro
 *    description: Dar de baja un Maestro. Requiere autenticación Bearer
 *    tags: [Maestro]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id del maestro
 *    responses:
 *      200:
 *        description: Maestro eliminado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Maestro'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Maestro no encontrado      
 */

//Obtener todos los maestros
//filtrado de maestros por nombre, apellido o email
/**
 * @swagger
 * api/v1/maestros:
 *  get:
 *    summary: Obtener Maestros
 *    description: Obtener todos los Maestros. Requiere autenticación Bearer
 *    tags: [Maestro]
 *    parameters:
 *      - in: query
 *        name: nombre
 *        schema:
 *          type: text
 *        required: false
 *        description: nombre del maestro
 *      - in: query
 *        name: apellido
 *        schema:
 *          type: text
 *        required: false
 *        description: apellido del maestro
 *      - in: query
 *        name: email
 *        schema:
 *          type: text
 *        required: false
 *        description: email del maestro
 *    responses:
 *      200:
 *        description: Todos los Maestros
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Maestro'
 *      400:
 *        description: Error en la petición
 *      404: 
 *        description: Lista de Maestros vacía
 */

//Obtener maestro por id
/**
 * @swagger
 * api/v1/maestros/{id}:
 *  get:
 *    summary: Obtener Maestro
 *    description: Obtener un Maestro por ID. Requiere autenticación Bearer
 *    tags: [Maestro]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id del maestro
 *    responses:
 *      200:
 *        description: Maestro seleccionado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Maestro'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Maestro no encontrado        
 */
