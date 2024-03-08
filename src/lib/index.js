// import './reset.css'; // reset de estilos
// import './styles.css'; // estilos del proyecto
import { use } from 'browser-sync';
import { exp, daysWeek, months } from './data.js';
import { timeToSeconds } from './misc.js';

class Task {
    constructor(prompt) {
        this.parseTask(prompt);
    }

    parseTask(prompt) {
        this.originalPrompt = prompt;
        this.prompt = prompt
            .replace(/\s{1,}/g, ' ')
            .toLowerCase()
            .replace(/á|é|í|ó|ú|ü/g, (match) => {
                if (/á/.test(match)) return 'a';
                if (/é/.test(match)) return 'e';
                if (/í/.test(match)) return 'i';
                if (/ó/.test(match)) return 'o';
                if (/ú|ü/.test(match)) return 'u';
            });
        // NOTE: función para remover acentos del prompt
        // string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        // descartada porque también afectaba la ñ
        this.userTask = '';

        this.project = exp.project.test(this.prompt)
            ? this.prompt.match(exp.project)[0]
            : '';

        this.category = exp.category.test(this.prompt)
            ? this.prompt.match(exp.category).slice(0, 2)
            : '';

        if (exp.es.relevance.test(this.prompt)) {
            this.important = /\*|^i/i.test(
                this.prompt.match(exp.es.relevance).pop(),
            );
            this.urgent = !this.important;
        } else {
            this.important = false;
            this.urgent = false;
        }

        this.timer = exp.es.timer.test(this.prompt)
            ? timeToSeconds(
                  this.prompt.match(exp.es.timer)[2],
                  this.prompt.match(exp.es.timer)[3],
              )
            : false;
        this.timerPast = this.timer ? 0 : false;

        this.recurrent =
            exp.es.loopAbsolute.test(this.prompt) ||
            exp.es.loopRelative.test(this.prompt);

        this.dueDate = this.nextRecurrentDate() || this.getFixedDate();
    }

    getFixedDate() {
        const dueDate = new Date();

        if (this.prompt.match(exp.es.date1)) {
            const day = +this.prompt.match(exp.es.date1)[1];
            let month = this.prompt
                .match(exp.es.date1)[2]
                .replace(/ de |\//g, '');

            month = /\d/.test(month)
                ? +month - 1
                : this.getIndex(months.es, month);
            dueDate.setDate(day);
            dueDate.setMonth(month);
            if (new Date() > dueDate)
                dueDate.setFullYear(dueDate.getFullYear() + 1);

            return dueDate;
        }

        if (this.prompt.match(exp.es.date2)) {
            const day = this.prompt.match(exp.es.date2)[0];

            if (/pasado/i.test(day)) dueDate.setDate(dueDate.getDate() + 1);
            if (/ma.ana/i.test(day)) dueDate.setDate(dueDate.getDate() + 1);
            
            return dueDate;
        }

        if (this.prompt.match(exp.es.date3)) {
            const day = this.prompt.match(exp.es.date3)[0];
            const dayIndex = this.getIndex(
                daysWeek.es,
                this.prompt.match(exp.es.date3)[2],
            );
            
            dueDate.setDate(
                dayIndex < dueDate.getDay()
                    ? dueDate.getDate() + dayIndex + (7 - dueDate.getDay())
                    : dueDate.getDate() + (dayIndex - dueDate.getDay()),
            );
            if (/proximo/i.test(day)) dueDate.setDate(dueDate.getDate() + 7);

            return dueDate;
        }

        if (this.prompt.match(exp.es.date4)) {


            return dueDate;
        }

        return false
    }

    getIndex(dataSource, compareTo) {
        return dataSource.findIndex(
            (element) => element.slice(0, 2) === compareTo.slice(0, 2),
        );
    }

    nextRecurrentDate() {
        if (!exp.es.loopAbsolute.test(this.prompt)) return false;

        const nextDue = new Date();
        const userDate = this.prompt.match(exp.es.loopAbsolute);

        if (!/\d/.test(userDate[0])) {
            const dayIndex = this.getIndex(daysWeek.es, userDate[1]);

            nextDue.setDate(
                dayIndex < nextDue.getDay()
                    ? nextDue.getDate() + dayIndex + (7 - nextDue.getDay())
                    : nextDue.getDate() + (dayIndex - nextDue.getDay()),
            );
        } else {
            const lastDayMonth = new Date(
                nextDue.getFullYear(),
                nextDue.getMonth() + 1,
                0,
            ).getDate();

            nextDue.setDate(
                +userDate[1] > lastDayMonth ? lastDayMonth : +userDate[1],
            );
            nextDue.setMonth(
                nextDue.getDate() < new Date().getDate()
                    ? nextDue.getMonth() + 1
                    : nextDue.getMonth(),
            );
        }

        return nextDue;
    }

    readTask() {
        console.log(JSON.stringify(this, null, 2));
    }
}

const as = new Task(
    '@vida #casa todos el próximo viernes sacar áéíóúññññ la basura *',
);

as.readTask();
