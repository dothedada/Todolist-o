import Task from './task.js';
// TODO:
// Crear la biblioteca de tareas con las siguientes posibilidades
// 6- ordenar tareas
// 7- convertir tareas vencidas en urgentes
// 8- eliminar tareas no cumplidas luego de una semana de su vencimiento
//
// WARN: revisar el day cuando se establece un periodo de recurrecia futuro

const toDo = (() => {
    const tasks = [];

    const createTask = (taskPrompt) => {
        const newTask = new Task(taskPrompt);
        tasks.push(newTask);
        // localStorage.setItem(newTask.taskID, newTask)
    };

    const getTaskIndex = (taskID) =>
        tasks.findIndex((task) => task.taskID === taskID);

    const updateTask = (taskID, newTaskPrompt) => {
        tasks[getTaskIndex(taskID)].update(newTaskPrompt);
        // localStorage.setItem(taskID, tasks[getTaskIndex(taskID)])
    };

    const markTaskDone = (taskID) => {
        tasks[getTaskIndex(taskID)].done();
        // localStorage.setItem(taskID, tasks[getTaskIndex(taskID)])
    };
    const markTaskUndone = (taskID) => {
        tasks[getTaskIndex(taskID)].undone();
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
        markTaskUndone,
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

    const pastDue = () =>
        toDo.tasks.filter((task) => {
            if (!task.dueDate || task.done) return false;
            return task.dueDate < new Date().setMilliseconds(0);
        });

    const eraseable = () => {
        const weekAgo = new Date();
        weekAgo.setMilliseconds(0);
        weekAgo.setDate(-7);

        return toDo.tasks.filter((task) => {
            if (!task.done) return false;
            return task.doneDate < weekAgo;
        });
    };

    const notDoneAndForgotten = () => {
        const monthAgo = new Date();
        monthAgo.setMilliseconds(0);
        monthAgo.setMonth(-1);
        toDo.tasks.filter((task) => {
            if (!task.dueDate || task.done) return false;
            return task.dueDate < monthAgo;
        });
    };

    return {
        anytime,
        today,
        tomorrow,
        future,
        pastDue,
        eraseable,
        notDoneAndForgotten,
    };
})();

const filteredBy = (() => {
    const importance = (tasksList) =>
        tasksList.filter((task) => task.important);
    const urgent = (tasksList) => tasksList.filter((task) => task.urgent);
    const hasTimer = (tasksList) => tasksList.filter((task) => task.timer);
    const done = (tasksList) => tasksList.filter((task) => task.done);
    const undone = (tasksList) => tasksList.filter((task) => !task.done);
    const recurrent = (tasksList) => tasksList.filter((task) => task.recurrent);

    return { importance, urgent, hasTimer, done, undone, recurrent };
})();

const makeUrgentTasks = () => {
    getTasksByDay.pastDue().forEach((task) => (task.urgent = true));
};

toDo.createTask('hoy vamos a saltar lazo !');
toDo.createTask('mañana vamos a saltar por * la ventana');
toDo.createTask('tratemos de no t:3h morir 3/3');

makeUrgentTasks()
console.log(toDo.tasks)
