import Task from './task.js';
// TODO:
// Crear la biblioteca de tareas con las siguientes posibilidades
// 6- ordenar tareas
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
        tasks[getTaskIndex(taskID)].markDone();
        // localStorage.setItem(taskID, tasks[getTaskIndex(taskID)])
    };
    const markTaskUndone = (taskID) => {
        tasks[getTaskIndex(taskID)].markUndone();
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

    return {
        anytime,
        today,
        tomorrow,
        future,
        pastDue,
    };
})();

const tasksFilteredBy = {
    importance: (tasks) => tasks.filter((task) => task.important),
    urgent: (tasks) => tasks.filter((task) => task.urgent),
    hasTimer: (tasks) => tasks.filter((task) => task.timer),
    done: (tasks) => tasks.filter((task) => task.done),
    undone: (tasks) => tasks.filter((task) => !task.done),
    recurrent: (tasks) => tasks.filter((task) => task.recurrent),
};


const makeDueTasksUrgent = () => {
    getTasksByDay.pastDue().forEach((task) => {
        const modifiedTask = task;
        modifiedTask.urgent = true;
    });
};

const deleteTasksForgotten = () => {
    const monthAgo = new Date();
    monthAgo.setMilliseconds(0);
    monthAgo.setMonth(new Date().getMonth() - 1);

    const tasksForgotten = toDo.tasks.filter((task) => {
        if (!task.dueDate || task.done) return false;
        return task.dueDate < monthAgo;
    });

    tasksForgotten.forEach((task) => toDo.removeTask(task.taskID));
};

const deleteDoneTasks = () => {
    const weekAgo = new Date();
    weekAgo.setMilliseconds(0);
    weekAgo.setDate(new Date().getDate() - 7);

    const doneTasks = toDo.tasks.filter((task) => {
        if (!task.done) return false;
        return task.doneDate < weekAgo;
    });

    doneTasks.forEach((task) => toDo.removeTask(task.taskID));
};

const purgeToDo = () => {
    deleteDoneTasks();
    deleteTasksForgotten();
    makeDueTasksUrgent();
};

toDo.createTask('hoy vamos a saltar lazo');
toDo.createTask('mañana vamos a saltar * por la ventana @carajo');
toDo.createTask('tratemos de no t:3h morir 20/3');
console.log(tasksFilteredBy.importance(toDo.tasks))
