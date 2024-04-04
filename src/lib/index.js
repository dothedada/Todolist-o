import Task from './task.js';
// TODO:
// Crear la biblioteca de tareas con las siguientes posibilidades
// 5- filtrar tareas
// 6- ordenar tareas
// 7- convertir tareas vencidas en urgentes
// 8- eliminar tareas no cumplidas luego de una semana de su vencimiento
//
// WARN: revisar el day cuando se establece un periodo de recurrecia futuro

// const as = new Task('@hola carenalga, 12/3 esta es una www.prueba.com')
// as.readTask()

const lib = (() => {
    const tasks = []

    const create = (taskPrompt) => {
        const newTask = new Task(taskPrompt)
        tasks.unshift(newTask)
        // localStorage.setItem(newTask.taskID, newTask)
    }

    const find = (taskID) => tasks.findIndex(task => task.taskID === taskID)

    const remove = (taskID) => {
        tasks.splice(find(taskID), 1)
    }

    const done = (taskID) => {
        tasks[find(taskID)].markDone()
    }
    
    const update = (taskID, newTaskPrompt) => {
        tasks[find(taskID)].updateTask(newTaskPrompt)
    }

    const arrange = () => {

    }

    const todayTasks = () => {
        // tasks.forEach(task => console.log(task.dueDate.getDate() === new Date().getDate()))
        // console.log(tasks[2].dueDate.getDate() === new Date().getDate())
        const conFecha = tasks.filter(task => task.dueDate).filter(task => task.dueDate.getDate() === new Date().getDate())
        return conFecha
    }

    const filter = (by, value) => {
        // urgente importante timer recurrentes realizadas no realizadas
        // hoy mañana luego
        // proyecto categoría 
    }

    return { tasks, create, find, remove, done, update, todayTasks}
})()


lib.create('@carajo me lleva hoy')
lib.create('#carajo me lleva hoy')
lib.create('hijo de los mil changos!!! @laPutaMadre mañana')
console.log(lib.tasks)
console.log(lib.todayTasks())
lib.todayTasks()[0].updateTask('carajillloooooo')
console.log(lib.tasks)

