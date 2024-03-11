// import './reset.css'; // reset de estilos
// import './styles.css'; // estilos del proyecto
import { exp, daysWeek, months } from './data.js';

// TODO:
// 1- crear método para actualizar el due date en tareas recurrentes
// Nuevo módulo para la administración de tareas
// 2- Crear la biblioteca de tareas
// 3- creación
// 4- eliminar
// 5- actualizar
// 6- filtrar
// 7- ordenar

class Task {
    constructor(prompt) {
        console.time('Tiempo creación de tarea:')
        
        Object.defineProperties(this, {
            done: {
                value: false,
                enumerable: false,
                configurable: true,
                writable: true,
            },
            taskCreation: {
                value: new Date(),
            },
            taskID: {
                value: Math.floor(
                    Math.random() * new Date().getTime(),
                ).toString(26),
            },
        });
        this.parseTask(prompt);
        this.createCleanTaks();

        console.timeEnd('Tiempo creación de tarea:')
    }

    parseTask(prompt) {
        this.originalPrompt = prompt;
        this.taskRender = prompt;
        const taskParse = prompt
            .replace(/\s+/g, ' ')
            .toLowerCase()
            .replace(/á|é|í|ó|ú|ü/g, (match) => {
                if (match === 'á') return 'a';
                if (match === 'é') return 'e';
                if (match === 'í') return 'i';
                if (match === 'ó') return 'o';
                if (match === 'ú' || match === 'ü') return 'u';
            });

        const projectDef = prompt.match(exp.project);
        const categoryDef = prompt.match(exp.category);
        const relevanceDef = taskParse.match(exp.es.relevance);
        const timerDef = taskParse.match(exp.es.timer);
        const recurrentAbsDef = taskParse.match(exp.es.loopAbsolute);
        const recurrentRelDef = taskParse.match(exp.es.loopRelative);
        const recurrentCountDef = taskParse.match(exp.es.loopPeriod);
        const date1RR = taskParse.match(exp.es.date1);
        const date2RR = taskParse.match(exp.es.date2);
        const date3RR = taskParse.match(exp.es.date3);
        const date4RR = taskParse.match(exp.es.date4);
        const mailRR = prompt.match(exp.mail);
        const urlRR = prompt.match(exp.url);

        if (projectDef) this.project = projectDef[0];
        if (categoryDef) this.categories = categoryDef.slice(0, 2);
        if (relevanceDef) this.setRelevance(relevanceDef);
        if (timerDef) this.setTimer(timerDef);
        if (recurrentAbsDef) this.setRecurrentDateAbs(recurrentAbsDef);
        if (!this.dueDate && date1RR) this.setFixedDate1(date1RR);
        if (!this.dueDate && date2RR) this.setFixedDate2(date2RR);
        if (!this.dueDate && date3RR) this.setFixedDate3(date3RR);
        if (!this.dueDate && date4RR) this.setFixedDate4(date4RR);
        if (recurrentRelDef) this.setRecurrentDateRel(recurrentRelDef);
        if (recurrentCountDef) this.setRecurrentCount(recurrentCountDef);
        if (mailRR) this.getLinks(mailRR, 'mail');
        if (urlRR) this.getLinks(urlRR, 'url');
    }

    getDayMonthIndex(dataSource, userString) {
        return dataSource.findIndex((element) => element === userString);
    }

    setNextWeekDay(userDayIndex, baseDate) {
        return userDayIndex < baseDate.getDay()
            ? baseDate.getDate() + userDayIndex + (7 - baseDate.getDay())
            : baseDate.getDate() + (userDayIndex - baseDate.getDay());
    }

    getLastDayMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    setRelevance(regexResult) {
        /\*|^i/i.test(regexResult.pop())
            ? (this.important = true)
            : (this.urgent = true);
        this.taskRender = this.taskRender.replace(/\B[*!]/g, '');
    }

    setTimer(regexResult) {
        const units = /h/i.test(regexResult[3]) ? 3600 : 60;
        this.timer = +regexResult[2] * units;
        this.timerPast = 0;
    }

    setRecurrentDateAbs(regexResult) {
        const nextDue = new Date();

        if (!/\d/.test(regexResult[0])) {
            const dayIndex = this.getDayMonthIndex(daysWeek.es, regexResult[1]);
            nextDue.setDate(this.setNextWeekDay(dayIndex, nextDue));
            this.recurrent = { day: dayIndex };
            return;
        }
        nextDue.setDate(
            +regexResult[1] > this.getLastDayMonth(nextDue)
                ? this.getLastDayMonth(nextDue)
                : +regexResult[1],
        );
        nextDue.setMonth(
            nextDue.getDate() < new Date().getDate()
                ? nextDue.getMonth() + 1
                : nextDue.getMonth(),
        );

        this.recurrent = { date: +regexResult[1] };

        this.dueDate = nextDue;
    }

    setFixedDate1(regexResult) {
        const dueDate = new Date();

        const day = +regexResult[1];
        let month = regexResult[2].replace(/ de |\/| of /g, '');

        month = /\d/.test(month)
            ? +month - 1
            : this.getDayMonthIndex(months.es, month);

        dueDate.setMonth(month);
        if (new Date() > dueDate) {
            dueDate.setFullYear(dueDate.getFullYear() + 1);
        }
        dueDate.setDate(
            day < this.getLastDayMonth(dueDate)
                ? day
                : this.getLastDayMonth(dueDate),
        );

        this.dueDate = dueDate;
    }

    setFixedDate2(regexResult) {
        const dueDate = new Date();
        const day = regexResult;

        let daysBetween = day[5][0] === 'd' ? 1 : 7;
        daysBetween = +daysBetween * +day[0].match(/\d+/);

        if (day[5][0] === 'd') daysBetween -= 1;
        if (/ma.ana|tomorr/i.test(day[2])) daysBetween += +1;
        if (exp.es.week.test(day[0])) {
            const dayIndex = this.getDayMonthIndex(daysWeek.es, day[3]);
            dueDate.setDate(this.setNextWeekDay(dayIndex, dueDate));
        }
        dueDate.setDate(dueDate.getDate() + daysBetween);

        this.dueDate = dueDate;
    }

    setFixedDate3(regexResult) {
        const dueDate = new Date();
        const day = regexResult;
        const dayIndex = this.getDayMonthIndex(daysWeek.es, day[2]);
        dueDate.setDate(this.setNextWeekDay(dayIndex, dueDate));
        if (/prox|next/i.test(day[1])) dueDate.setDate(dueDate.getDate() + 7);

        this.dueDate = dueDate;
    }

    setFixedDate4(regexResult) {
        const dueDate = new Date();
        const day = regexResult[0];

        if (/pasado|after/i.test(day)) dueDate.setDate(dueDate.getDate() + 1);
        if (/ma.ana|tomorr/i.test(day)) dueDate.setDate(dueDate.getDate() + 1);

        this.dueDate = dueDate;
    }

    setRecurrentDateRel(regexResult) {
        let days = +regexResult[1];
        if (/^week|^semana/.test(regexResult[2])) days *= 7;
        if (/^month|^mes/.test(regexResult[2])) days *= 30;
        if (/^day|^dia/.test(regexResult[2])) days -= 1;
        if (!this.dueDate) {
            this.dueDate = new Date();
            this.dueDate.setDate(this.dueDate.getDate() + days);
        }

        this.recurrent = { daysSpan: days };
    }

    setRecurrentCount(regexResult) {
        if (/veces|times/i.test(regexResult)) {
            this.recurrent = { total: +regexResult[4], current: 0 };
            return;
        }
        if (!/\d+/.test(regexResult[1])) {
            this.recurrent = {
                month: this.getDayMonthIndex(months.es, regexResult[1]),
            };
        } else {
            if (!this.dueDate) this.dueDate = new Date();
            const endDate = new Date();
            endDate.setMonth(
                this.dueDate.getMonth() + +regexResult[0].match(/\d+/),
            );
            this.recurrent = { endDate };
        }
    }

    getLinks(regexResult, type) {
        regexResult.forEach((link) => {
            let linkTask =
                type === 'mail'
                    ? link
                    : link.match(
                          /([a-z0-9\-]+\.)?([a-z0-9\-]{1,63}\.[a-z0-9]{2,5})/i,
                      )[0];
            if (linkTask.length < link.length) linkTask += '(...)';
            if (!this['links']) this['links'] = { display: [], url: [] };
            this.links.display.push(linkTask);
            this.links.url.push(type === 'mail' ? `mailto:${link}` : link);
        });
    }

    createCleanTaks() {
        if (this.project) {
            this.taskRender = this.taskRender.replace(exp.project, '');
        }
        if (this.categories) {
            this.taskRender = this.taskRender.replace(exp.category, '');
        }
        if (this.links)
            this.links.url.forEach((url, index) => {
                this.taskRender = this.taskRender.replace(
                    url,
                    this.links.display[index],
                );
            });
        this.taskRender = this.taskRender.trim().replace(/\s+/g, ' ');
        this.taskRenderLength = this.taskRender.length;
    }

    updateTask(prompt) {
        for (const key in this) {
            Reflect.deleteProperty(this, key)
        }
        this.parseTask(prompt);
        this.createCleanTaks();
    }

    readTask() {
        console.log(JSON.stringify(this, null, 2));
    }
}

// test
const as = new Task(
    '! buscar la imagen en https://www.carajillo.com/carenalga/re_donDa.jpg y enviarla a info@mmejia.com @casa veces #compras #navidad durante noviembre',
);
as.readTask();
console.log(as.taskID, as.done, as.taskCreation)
