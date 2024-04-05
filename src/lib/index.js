import './reset.css'
import './styles.css'
import { toDo, filteredBy, groupFuntions } from './toDo.js';

// TODO:
// 1- Layout inicial, variables, inorporación de fuentes
// 2- SVGs para la iconografía
// 3- Comportamiento elementos insterfase (Botones, enlaces y demás)
// 4- Formulario creación de tareas
// 5- Layout filtros
// 6- layout tareas
// 7- formulario edición de tareas
// 8- layout menú configuración
//
// WARN: revisar el day cuando se establece un periodo de recurrecia futuro

toDo.createTask('20/4 marihuaneros con dislexia')
toDo.createTask('me lleva mañana')
toDo.createTask('carajillo hoy')
groupFuntions.sortByDate()
filteredBy.importance(toDo.tasks)

console.log(toDo.tasks)
