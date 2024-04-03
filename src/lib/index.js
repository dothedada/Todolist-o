import Task from './task.js';
// TODO:
// Crear la biblioteca de tareas con las siguientes posibilidades
// 4- actualizar tareas
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

    const find = (taskID) => {
        return tasks.findIndex(task => task.taskID === taskID)
    }

    const remove = (taskID) => {
        tasks.splice(find(taskID), 1)
    }

    const done = (taskID) => {
        tasks[find(taskID)].markDone()
    }
    
    const update = (taskID, newTaskPrompt) => {
        tasks[find(taskID)].updateTask(newTaskPrompt)
    }


    return { tasks, create, find, remove, done, update}
})()


lib.create('@carajo me lleva')
lib.create('#carajo me lleva')
console.log(lib.tasks)
lib.update(1, 'hijo de los mil changos!!! @laPutaMadre')
console.log(lib.tasks)

