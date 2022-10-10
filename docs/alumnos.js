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
 * api/v1/alumnos:
 *  post:
 *    summary: Crear Alumno
 *    description: Dar de alta un Alumno. Requiere autenticación Bearer
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
 *        description: Nuevo Alumno fue creado!
 *      400:
 *        description: Error en la petición
 */

//Actualizar alumno
/**
 * @swagger
 * api/v1/alumnos/{id}:
 *  patch:
 *    summary: Actualizar Alumno
 *    description: Actualizar datos de un Alumno. Requiere autenticación Bearer
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
 *        description: Alumno actualizado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Alumno'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Alumno no encontrado       
 */

//Eliminar alumno
/**
 * @swagger
 * api/v1/alumnos/{id}:
 *  delete:
 *    summary: Eliminar Alumno
 *    description: Dar de baja una Alumno. Requiere autenticación Bearer
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
 *        description: Alumno eliminado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Alumno'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Alumno no encontrado      
 */

//Obtener todos los alumnos
//filtrado de alumnos por nombre, apellido o email
/**
 * @swagger
 * api/v1/alumnos:
 *  get:
 *    summary: Obtener Alumnos
 *    description: Obtener todos los Alumnos. Requiere autenticación Bearer
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
 *        description: Todos los Alumnos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Alumno'
 *      400:
 *        description: Error en la petición
 *      404: 
 *        description: Lista de Alumnos vacía
 */

//Obtener alumno por id
/**
 * @swagger
 * api/v1/alumnos/{id}:
 *  get:
 *    summary: Obtener Alumno
 *    description: Obtener un Alumno por ID. Requiere autenticación Bearer
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
 *        description: Alumno seleccionado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Alumno'
 *      400:
 *        description: Error en la petición
 *      404:
 *        description: Alumno no encontrado        
 */
