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

        this.dueDate = this.nextRecurrentDate() || 'holi';
    }

    nextRecurrentDate() {
        if (!exp.es.loopAbsolute.test(this.prompt)) return false;
        const nextDue = new Date();
        const userDate = this.prompt.match(exp.es.loopAbsolute);

        if (!/\d/.test(userDate[0])) {
            const dueDay = daysWeek.es.findIndex(
                (day) => day.slice(0, 2) === userDate[1].slice(0, 2),
            );
            if (dueDay < nextDue.getDay()) {
                nextDue.setDate(
                    nextDue.getDate() + dueDay + (7 - nextDue.getDay()),
                );
            } else {
                nextDue.setDate(
                    nextDue.getDate() + (dueDay - nextDue.getDay()),
                );
            }
        } else {
            // nextDue.setMonth(1);
            const lastDayMonth = new Date(
                nextDue.getFullYear(),
                nextDue.getMonth() + 1,
                0,
            ).getDate();

            nextDue.setDate(+userDate[1] > lastDayMonth ? lastDayMonth : +userDate[1])
            nextDue.setMonth(nextDue.getDate() < new Date().getDate() ? nextDue.getMonth() + 1 : nextDue.getMonth() )
        }

        console.log(nextDue, userDate);

        return nextDue;
    }

    readTask() {
        console.log(JSON.stringify(this, null, 2));
    }
}

const as = new Task(
    'mañiño   @holi  #carepa tengo 1 hora todos los 3 de cada més asd #chimuelo #carajillo urgEnte as',
);

as.readTask();
