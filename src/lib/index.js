// import './reset.css'; // reset de estilos
// import './styles.css'; // estilos del proyecto
// import { use } from 'browser-sync';
import { exp, daysWeek, months } from './data.js';
// import { timeToSeconds } from './misc.js';

// TODO: obtener las fechas relativas en función de la fecha seteada
// realizar el conteo de loops
// desarrollar interfase
// integrar con ls interfase

class Task {
    constructor(prompt) {
        this.parseTask(prompt);
        // this.taskCreation = new Date();
        this.done = false;
    }

    parseTask(prompt) {
        this.originalPrompt = prompt;
        const taskParse = prompt
            .replace(/\s{1,}/g, ' ')
            .toLowerCase()
            .replace(/á|é|í|ó|ú|ü/g, (match) => {
                if (match === 'á') return 'a';
                if (match === 'é') return 'e';
                if (match === 'í') return 'i';
                if (match === 'ó') return 'o';
                if (match === 'ú' || match === 'ü') return 'u';
            });
        // this.task = '';

        // Task definitions, RegexResults. Project an categoty are case sensitive
        const projectDef = prompt.match(exp.project);
        const categoryDef = prompt.match(exp.category);
        const relevanceDef = taskParse.match(exp.es.relevance);
        const timerDef = taskParse.match(exp.es.timer);
        const recurrentAbsDef = taskParse.match(exp.es.loopAbsolute);
        const recurrentRelDef = taskParse.match(exp.es.loopRelative);
        const recurrentLoopCountRR = taskParse.match(exp.es.loopCount);
        const date1RR = taskParse.match(exp.es.date1);
        const date2RR = taskParse.match(exp.es.date2);
        const date3RR = taskParse.match(exp.es.date3);
        const date4RR = taskParse.match(exp.es.date4);

        // Set task object properties
        if (projectDef) this.project = projectDef[0];
        if (categoryDef) this.categories = categoryDef.slice(0, 2);
        if (relevanceDef) this.setRelevance(relevanceDef);
        if (timerDef) this.setTimer(timerDef);
        if (recurrentAbsDef) this.setNextRecurrentDate(recurrentAbsDef);
        if (!this.dueDate && date1RR) this.setFixedDate1(date1RR);
        if (!this.dueDate && date2RR) this.setFixedDate2(date2RR);
        if (!this.dueDate && date3RR) this.setFixedDate3(date3RR);
        if (!this.dueDate && date4RR) this.setFixedDate4(date4RR);
    }

    getDayMonthIndex(dataSource, userString) {
        return dataSource.findIndex((element) => element === userString);
    }

    setNextWeekDay(userDayIndex, baseDate) {
        return userDayIndex < baseDate.getDay()
            ? baseDate.getDate() + userDayIndex + (7 - baseDate.getDay())
            : baseDate.getDate() + (userDayIndex - baseDate.getDay());
    }

    setRelevance(regexResult) {
        /\*|^i/i.test(regexResult.pop())
            ? (this.important = true)
            : (this.urgent = true);
    }

    setTimer(regexResult) {
        const units = /h/i.test(regexResult[3]) ? 3600 : 60;
        this.timer = +regexResult[2] * units;
        this.timerPast = 0;
    }

    setNextRecurrentDate(regexResult) {
        const nextDue = new Date();

        if (!/\d/.test(regexResult[0])) {
            const dayIndex = this.getDayMonthIndex(daysWeek.es, regexResult[1]);
            nextDue.setDate(this.setNextWeekDay(dayIndex, nextDue));
        } else {
            const lastDateMonth = new Date(
                nextDue.getFullYear(),
                nextDue.getMonth() + 1,
                0,
            ).getDate();

            nextDue.setDate(
                +regexResult[1] > lastDateMonth
                    ? lastDateMonth
                    : +regexResult[1],
            );
            nextDue.setMonth(
                nextDue.getDate() < new Date().getDate()
                    ? nextDue.getMonth() + 1
                    : nextDue.getMonth(),
            );
        }

        this.recurrent = true;
        this.dueDate = nextDue;
    }

    setFixedDate1(regexResult) {
        const dueDate = new Date();

        const day = +regexResult[1];
        let month = regexResult[2].replace(/ de |\//g, '');

        month = /\d/.test(month)
            ? +month - 1
            : this.getDayMonthIndex(months.es, month);
        dueDate.setDate(day);
        dueDate.setMonth(month);
        if (new Date() > dueDate)
            dueDate.setFullYear(dueDate.getFullYear() + 1);

        this.dueDate = dueDate;
    }

    setFixedDate2(regexResult) {
        const dueDate = new Date();
        const day = regexResult;
        console.log(regexResult)

        let daysBetween = day[5][0] === 'd' ? 1 : 7
        daysBetween = +daysBetween * +day[0].match(/\d+/);

        if (day[5][0] === 'd') daysBetween -= 1;
        if (/ma.ana|tomorrow/i.test(day[2])) daysBetween += +1;
        if (/de e/i.test(day)) {
            const dayIndex = this.getDayMonthIndex(daysWeek.es, day[3]);
            dueDate.setDate(this.setNextWeekDay(dayIndex, dueDate));
        }
        dueDate.setDate(dueDate.getDate() + daysBetween);

        this.dueDate = dueDate;
    }

    // setFixedDate3(regexResult) {
    //     const dueDate = new Date();
    //     const day = regexResult;
    //     const dayIndex = this.getDayMonthIndex(daysWeek.es, day[2]);
    //     nextDue.setDate(this.setNextWeekDay(dayIndex, nextDue));
    //     if (/proximo/i.test(day[0])) dueDate.setDate(dueDate.getDate() + 7);
    //
    //     this.dueDate = nextDue;
    // }
    //
    // setFixedDate4(regexResult) {
    //     const dueDate = new Date();
    //     const day = regexResult[0];
    //
    //     if (/pasado/i.test(day)) dueDate.setDate(dueDate.getDate() + 1);
    //     if (/ma.ana/i.test(day)) dueDate.setDate(dueDate.getDate() + 1);
    //
    //     this.dueDate = nextDue;
    // }

    readTask() {
        console.log(JSON.stringify(this, null, 2));
    }
}

// const as = new Task(window.prompt('qué quieres hacer?'))
const as = new Task('* @ # todos en de mañana en 8 dias de noviembre hora carajo');

as.readTask();
// const test = `@vida #casa de mañana en 2 semanas  sacar la basura *`.match(
//     exp.es.date2,
// );
// console.log(typeof test, test);
