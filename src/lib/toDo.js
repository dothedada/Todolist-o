import Task from './task.js';

const storage = {
    load: [], //Object.keys(localStorage).filter((id) => /^toDo_/.test(id)),

    update: (taskID, task) => {
        // localStorage.setItem(taskID, task);
    },

    remove: (taskID) => {
        // localStorage.removeItem(taskID);
    },
};

const toDo = {
    tasks: [],

    // CRUD
    createTask: (taskPrompt) => {
        const newTask = new Task(taskPrompt);
        toDo.tasks.push(newTask);
        storage.update(newTask.taskID, newTask);
    },

    getTask: (taskID) => toDo.tasks.find((task) => task.taskID === taskID),

    updateTask: (taskID, newPrompt) => {
        toDo.getTask(taskID).update(newPrompt);
        storage.update(taskID, toDo.getTask(taskID));
    },

    markTaskDone: (taskID) => {
        toDo.getTask(taskID).markDone();
        update(taskID, toDo.getTask(taskID));
    },
    markTaskUndone: (taskID) => {
        toDo.getTask(taskID).markUndone();
        storage.update(taskID, toDo.getTask(taskID));
    },
    removeTask: (taskID) => {
        toDo.tasks.splice(
            toDo.tasks.findIndex((task) => task.taskID === taskID),
            1,
        );
        storage.remove(taskID);
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

const groupFuntions = {
    load: () => storage.load.forEach((task) => toDo.tasks.push(task)),

    sorting: (a, b) => {
        if ('dueDate' in a && 'dueDate' in b) return a.dueDate - b.dueDate;

        if ('dueDate' in a) return -1;
        if ('dueDate' in b) return 1;

        return a.taskCreation - b.taskCreation;
    },

    sortByDate: () => {
        toDo.tasks.sort((a, b) => {
            if (a.done && !b.done) return 1;
            if (!a.done && b.done) return -1;
            return groupFuntions.sorting(a, b);
        });
    },

    sortByRelevance: () => {
        toDo.tasks.sort((a, b) => {
            if (a.done && !b.done) return 1;
            if (!a.done && b.done) return -1;

            if (a.urgent && b.urgent) return groupFuntions.sorting(a, b);
            if (a.urgent) return -1;
            if (b.urgent) return 1;

            if (a.important && b.important) return groupFuntions.sorting(a, b);
            if (a.important) return -1;
            if (b.important) return 1;

            return groupFuntions.sorting(a, b);
        });
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

    init: () => {
        groupFuntions.load();
        groupFuntions.deleteDoneTasks();
        groupFuntions.deleteTasksForgotten();
        groupFuntions.makeDueTasksUrgent();
    },
};

export { toDo, filteredBy, groupFuntions };
