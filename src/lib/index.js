import './reset.css'
import './styles.css'
import { toDo, filteredBy, groupFuntions } from './toDo';

// TODO:
// 1- Incorporación de los estilos a las estructura del html
// 1a- revisión de accesibilidad
// 1b- integración íconos
// 1c- creación de tareas
// 1d- filtrado de tareas
// 1e- visualización de tareas
// 2- Creación de tareas - actualización info prompt, generación de la ficha
// 2a- integración con LocalStorage
// 3- filtrado de tareas - selección 1 o N parámetros
// 4- edición y eliminidado de tareas - 
// 5- funciones de configuración (color, tamaño de fuente, idioma)
// 5a- revisión de accesibilidad
//
// WARN: revisar el day cuando se establece un periodo de recurrecia futuro

toDo.createTask('20/4 marihuaneros con dislexia')
toDo.createTask('me lleva mañana')
toDo.createTask('me lleva mañana')
toDo.createTask('carajillo hoy')
toDo.createTask('carajillo hoy')
groupFuntions.sortByDate()
filteredBy.importance(toDo.tasks)

console.log(toDo.tasks)
