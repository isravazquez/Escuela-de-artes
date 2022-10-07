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
 * /v1/maestros:
 *  post:
 *    summary: da de alta a un maestro
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
 *        description: nuevo maestro fue creado!
 */

//Actualizar maestro
/**
 * @swagger
 * /v1/maestros/{id}:
 *  patch:
 *    summary: actualizar datos maestro
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
 *        description: maestro actualizado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Maestro'
 *      404:
 *        description: mastro no encontrado       
 */

//Eliminar maestro
/**
 * @swagger
 * /v1/maestros/{id}:
 *  delete:
 *    summary: eliminar a un maestro
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
 *        description: maestro eliminado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Maestro'
 *      404:
 *        description: maestro no encontrado      
 */

//Obtener todos los maestros
//filtrado de maestros por nombre, apellido o email
/**
 * @swagger
 * /v1/maestros:
 *  get:
 *    summary: obtener todos los maestros
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
 *        description: Todos los maestros
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Maestro'
 */

//Obtener maestro por id
/**
 * @swagger
 * /v1/maestros/{id}:
 *  get:
 *    summary: obtiene un maestro
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
 *        description: Todos los maestros
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Maestro'
 *      404:
 *        description: maestro no encontrado        
 */
