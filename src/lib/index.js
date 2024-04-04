import Task from './task.js';
// TODO:
// Crear la biblioteca de tareas con las siguientes posibilidades
// 6- ordenar tareas
//
// WARN: revisar el day cuando se establece un periodo de recurrecia futuro

const toDo = {
    tasks: [],

    // CRUD
    createTask: (taskPrompt) => {
        const newTask = new Task(taskPrompt);
        toDo.tasks.push(newTask);
        // localStorage.setItem(newTask.taskID, newTask)
    },

    getTask: (taskID) => toDo.tasks.find((task) => task.taskID === taskID),

    updateTask: (taskID, newPrompt) => {
        toDo.getTask(taskID).update(newPrompt);
        // localStorage.setItem(taskID, toDo.getTask(taskID))
    },

    markTaskDone: (taskID) => {
        toDo.getTask(taskID).markDone();
        // localStorage.setItem(taskID, toDo.getTask(taskID))
    },
    markTaskUndone: (taskID) => {
        toDo.getTask(taskID).markUndone();
        // localStorage.setItem(taskID, toDo.getTask(taskID))
    },
    removeTask: (taskID) => {
        toDo.tasks.splice(
            toDo.tasks.findIndex((task) => task.taskID === taskID),
            1,
        );
        // localStorage.removeItem(taskID)
    },

    // List by
    anytimeTasks: () => toDo.tasks.filter((task) => !task.dueDate),

    todayTasks: () =>
        toDo.tasks.filter((task) => {
            if (!task.dueDate) return false;
            return task.dueDate.getDate() === new Date().getDate();
        }),

    tomorrowTasks: () =>
        toDo.tasks.filter((task) => {
            if (!task.dueDate) return false;
            return task.dueDate.getDate() === new Date().getDate() + 1;
        }),

    futureTasks: () =>
        toDo.tasks.filter((task) => {
            if (!task.dueDate) return false;
            return task.dueDate.getDate() > new Date().getDate() + 1;
        }),

    pastDueTasks: () =>
        toDo.tasks.filter((task) => {
            if (!task.dueDate || task.done) return false;
            return task.dueDate < new Date().setMilliseconds(0);
        }),
};

const filteredBy = {
    importance: (tasks) => tasks.filter((task) => task.important),
    urgent: (tasks) => tasks.filter((task) => task.urgent),
    hasTimer: (tasks) => tasks.filter((task) => task.timer),
    done: (tasks) => tasks.filter((task) => task.done),
    undone: (tasks) => tasks.filter((task) => !task.done),
    recurrent: (tasks) => tasks.filter((task) => task.recurrent),
};

const globalOperations = {
    load: () => {
        const tasksIDs = Object.keys(localStorage).filter((id) =>
            /^toDo_/.test(id),
        );
        tasksIDs.forEach(task => toDo.tasks.push(task))
    },

    makeDueTasksUrgent: () => {
        toDo.pastDue().forEach((task) => {
            const modifiedTask = task;
            modifiedTask.urgent = true;
        });
    },

    deleteTasksForgotten: () => {
        const monthAgo = new Date();
        monthAgo.setMilliseconds(0);
        monthAgo.setMonth(new Date().getMonth() - 1);

        const tasksForgotten = toDo.tasks.filter((task) => {
            if (!task.dueDate || task.done) return false;
            return task.dueDate < monthAgo;
        });

        tasksForgotten.forEach((task) => toDo.removeTask(task.taskID));
    },

    deleteDoneTasks: () => {
        const weekAgo = new Date();
        weekAgo.setMilliseconds(0);
        weekAgo.setDate(new Date().getDate() - 7);

        const doneTasks = toDo.tasks.filter((task) => {
            if (!task.done) return false;
            return task.doneDate < weekAgo;
        });

        doneTasks.forEach((task) => toDo.removeTask(task.taskID));
    },

    purge: () => {
        globalOperations.deleteDoneTasks();
        globalOperations.deleteTasksForgotten();
        globalOperations.makeDueTasksUrgent();
    },
};

toDo.createTask('hoy vamos a saltar lazo');
toDo.createTask('mañana vamos a saltar * por la ventana @carajo');
toDo.createTask('tratemos de no t:3h morir 20/3');
console.log(toDo.tasks);
toDo.markTaskDone(2);
console.log(toDo.tasks);
