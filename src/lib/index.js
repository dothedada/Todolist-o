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

const toDo = (() => {
    const tasks = [];

    const createTask = (taskPrompt) => {
        const newTask = new Task(taskPrompt);
        tasks.unshift(newTask);
        // localStorage.setItem(newTask.taskID, newTask)
    };

    const getTaskIndex = (taskID) =>
        tasks.findIndex((task) => task.taskID === taskID);

    const updateTask = (taskID, newTaskPrompt) => {
        tasks[getTaskIndex(taskID)].updateTask(newTaskPrompt);
        // localStorage.setItem(taskID, tasks[getTaskIndex(taskID)])
    };

    const markTaskDone = (taskID) => {
        tasks[getTaskIndex(taskID)].markDone();
        // localStorage.setItem(taskID, tasks[getTaskIndex(taskID)])
    };
    const removeTask = (taskID) => {
        tasks.splice(getTaskIndex(taskID), 1);
        // localStorage.removeItem(taskID)
    };

    return {
        tasks,
        createTask,
        removeTask,
        markTaskDone,
        updateTask,
    };
})();

const getTasksByDay = (() => {
    const anytime = () => toDo.tasks.filter((task) => !task.dueDate);

    const today = () =>
        toDo.tasks.filter((task) => {
            if (!task.dueDate) return false;
            return task.dueDate.getDate() === new Date().getDate();
        });

    const tomorrow = () =>
        toDo.tasks.filter((task) => {
            if (!task.dueDate) return false;
            return task.dueDate.getDate() === new Date().getDate() + 1;
        });

    const future = () =>
        toDo.tasks.filter((task) => {
            if (!task.dueDate) return false;
            return task.dueDate.getDate() > new Date().getDate() + 1;
        });

    // const pastDue = () => 
    //     toDo.tasks.filter((task) => {
    //         if (!task.dueDate || task.done) return false
    //         return task.dueDate.getDate() < new Date().getDate()
    //     })

    return { anytime, today, tomorrow, future };
})();

toDo.createTask('hoy vamos a saltar lazo');
toDo.createTask('mañana vamos a saltar por la ventana');
toDo.createTask('tratemos de no morir');

console.log(toDo.tasks);
console.log(getTasksByDay.anytime());
console.log(getTasksByDay.today());
console.log(getTasksByDay.tomorrow());
