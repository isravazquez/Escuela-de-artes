//Crear alumno
/**
 * @swagger
 * components:
 *  schemas:
 *    Alumno:
 *      type: object
 *      properties:
 *        nombre:
 *          type: text
 *          description: nombre del alumno.
 *        apellido:
 *          type: text
 *          description: apellido del alumno.
 *        email:
 *          type: text
 *          description: email del alumno
 *        password:
 *          type: text
 *          description: password del alumno.
 *      required:
 *        - nombre
 *        - apellido
 *        - email
 *        - password
 *      example:
 *        nombre: jhon
 *        apellido: poe
 *        email: jhon.poe@beduclass.com
 *        password: e6Dp)q21         
 */

/**
 * @swagger
 * /v1/alumnos:
 *  post:
 *    summary: da de alta a un alumno
 *    tags: [Alumno]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Alumno'
 *    responses:
 *      201:
 *        description: nuevo alumno fue creado!
 */

//Actualizar alumno
/**
 * @swagger
 * /v1/alumnos/{id}:
 *  patch:
 *    summary: actualizar datos alumno
 *    tags: [Alumno]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id del alumno
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Alumno'
*    responses:
 *      200:
 *        description: alumno actualizado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Alumno'
 *      404:
 *        description: alumno no encontrado       
 */

//Eliminar alumno
/**
 * @swagger
 * /v1/alumnos/{id}:
 *  delete:
 *    summary: eliminar a un alumno
 *    tags: [Alumno]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id del alumno
 *    responses:
 *      200:
 *        description: alumno eliminado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Alumno'
 *      404:
 *        description: alumno no encontrado      
 */

//Obtener todos los alumnos
//filtrado de alumnos por nombre, apellido o email
/**
 * @swagger
 * /v1/alumnos:
 *  get:
 *    summary: obtener todos los alumnos
 *    tags: [Alumno]
 *    parameters:
 *      - in: query
 *        name: nombre
 *        schema:
 *          type: text
 *        required: false
 *        description: nombre del alumno
 *      - in: query
 *        name: apellido
 *        schema:
 *          type: text
 *        required: false
 *        description: apellido del alumno
 *      - in: query
 *        name: email
 *        schema:
 *          type: text
 *        required: false
 *        description: email del alumno
 *    responses:
 *      200:
 *        description: Todos los alumnos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Alumno'
 */

//Obtener alumno por id
/**
 * @swagger
 * /v1/alumnos/{id}:
 *  get:
 *    summary: obtiene un alumno
 *    tags: [Alumno]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id del alumno
 *    responses:
 *      200:
 *        description: Todos los alumnos
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Alumno'
 *      404:
 *        description: alumno no encontrado        
 */
