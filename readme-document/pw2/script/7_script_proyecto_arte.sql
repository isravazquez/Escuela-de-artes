-- Inserta registros de alumnos
INSERT INTO "Alumno" (id, nombre, apellido, email, password)
    VALUES (1, 'Jose Luis', 'Ortiz Mendez', 'jose.ortiz@arteycultura.mx', 'a1u001'),
           (2, 'Juan Manuel', 'Gutierrez Hernandez', 'juan.gutierrez@arteycultura.mx', 'a1u002'),
           (3, 'Roberto', 'Olmedo Sanchez', 'roberto@arteycultura.mx', 'a1u003'),
           (4, 'Samuel', 'Moreno Marquez', 'samuel.moreno@arteycultura.mx', 'a1u004');
		   
-- Inserta registros de Maestros
INSERT INTO "Maestro" (id, nombre, apellido, email, password)
    VALUES (1, 'Fernando', 'Pulido', 'fernando.pulido@arteycultura.mx', 'p$$001'),
           (2, 'Manuel', 'Gutierrez', 'manuel.gutierrez@arteycultura.mx', 'p$$002'),
           (3, 'Arturo', 'Martinez', 'arturo.martinez@arteycultura.mx', 'p$$s003'),
           (4, 'Carlos', 'Mendez', 'carlos.mendez@arteycultura.mx', 'p$$004');



-- Inserta registros de Actividades
INSERT INTO "Actividad" (id, maestro_id, nombre, dias, horario, costo, descrpcion)
    VALUES (1, 1, 'Danza Contemporanea', 10, 14, 1500, 'Danza folklórica mexicana'),
           (2, 1, 'Baile Folklórico',    12, 18, 1550, 'Mezcla de estilos que parten de la base del ballet clásico'),
           (3, 2, 'Ballet',        10, 12, 1600, 'disciplina en la que se trabaja todo el cuerpo y de forma progresiva'),
           (4, 2, 'Baile popular', 12, 20, 1800, 'diferentes elementos musicales étnicos fusionados'),
           (5, 3, 'Danza moderna', 15, 16, 1500, 'danza que se basa en la interpretación y visión individual del bailarín o coreógrafo');



-- Inserta registros de Incripciones
INSERT INTO inscripcion (id, alumno_id, actividad_id)
    VALUES (1, 2, 1),
           (2, 3, 1),
           (3, 4, 2);
	   
		   
--Consulta de Alumnos
select * from "Alumno"


--Elimina a alumno josé por su e-mail
DELETE from "Alumno" where email =  'jose.ortiz@arteycultura.mx';



--Actualiza correo de alumno 4
UPDATE "Alumno" SET email =  'roberto.olmedo@pruebasbedu.mx"' where id = 4;


--Consulta alumnos, y sus actividades inscritas		
SELECT "Alumno".id, "Alumno".nombre || "Alumno".apellido as alumno, "Actividad".horario, "Actividad".nombre,	
       "Actividad".costo, "Actividad".descrpcion  
FROM "Alumno"
INNER JOIN inscripcion on "Alumno".id = inscripcion.alumno_id 
INNER JOIN "Actividad" on "Actividad".id = inscripcion.actividad_id





--borra los registros de las tablas
BEGIN TRANSACTION;
DELETE FROM inscripcion;
DELETE FROM "Actividad";
DELETE FROM "Maestro";
DELETE FROM "Alumno";

--ROLLBACK TRANSACTION;

COMMIT TRANSACTION;

select * from "Alumno"








