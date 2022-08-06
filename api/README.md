Logica de negocio:
-los registros no se eliminan, solo se pueden poner entidades deshabilitadas :
 -cuando se dehabilitan, pasa a crear un registro de deshabilitacion, cada instancia de cada entidad puede tener uno o muchos registros de deshabilitacion depenciendo de las veces que lo hayan deshabilitado y vuelto a habilitar por los motivos que fueran  
 - cuando se deshabilita un cliente, automaticamente se deshabilitan todas sus sucursales automaticamente. Cuando en el registro de la tabla desahbilitados se muestra asociado a una oficina en particular es porque esa oficina esta deshabilitada, no el cliente ni las demas sucursales 

-para rehabilitar una entidad:
- tiene que pasar obligatoriamente una razon para rehabilitar esa instancia de la entidad con el nombre de reason, dado que de esta forma se genera un historial que podra consultar mas tarde
-cuando se rehabilita un cliente se vuelven a habilitar todas sus sucursales por default

-/api/admin/office/without/security/day :  devuelve la oficina (de cualquier cliente) que tenga asignado de aca a una semana dias de trabajo pero no llega a estar full cubierta 24 hrs de aca a 7 dias 

-/api/admin/office/without/workday : devuelve especificamente todas las oficinas sin ningun dia asignado en el calendar

para asignar un guardia a una oficina estos tiene que estar en la misma provincias y ambos estar habilitados
