import './reset.css'; // reset de estilos
import './styles.css'; // estilos del proyecto
import { exp, daysWeek, months } from './data';

// const task = {
//     prompt: 'str', //
//     task: 'str',
//     project: '@str',
//     category: ['#str', '#str'],
//     dueDate: 'date',
//     important: true,
//     urgent: false,
//     timerSeconds: 120,
//     recurrent: true,
//     recurrenceTime: 'string',
//     recurrentCount: 12,
//     done: true,
//     creationDate: 'date',
// };
const timerToSeconds = (tArr) => {
    const unit = /h/i.test(tArr[3][0]) ? 3600 : 60;
    return tArr[2] * unit;
};

class Task {
    constructor(prompt) {
        this.parseTask(prompt);
    }

    parseTask(prompt) {
        this.prompt = prompt.replace(/\s{1,}/g, ' ');

        this.project = exp.project.test(this.prompt)
            ? this.prompt.match(exp.project)[0] // 1 por tarea
            : '';

        this.category = exp.category.test(this.prompt)
            ? this.prompt.match(exp.category).slice(0, 2) // 2 por tarea max
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
            ? timerToSeconds(this.prompt.match(exp.es.timer))
            : false;
        this.timerPast = this.timer;
    }

    readTask() {
        console.table(this);
    }
}

const as = new Task(
    'mañiño   @holi  #carepa tengo 6 minutos  asd  #chimuelo #carajillo urgEnte as',
);

as.readTask();
// getPromptData(
//     'holi  12/mar ca todos los lunes  re @verga sucia t:2h #emb#ol1asdf tengo 1.5 minutos 3 * veces',
// );
// getPromptData(
//     '! Explore mañana re*sults * w!ith !the de este #domingo en 8 días below. Replace & List output todos cada 8 días results. Details lists capture @gr213oups. Explain urgente describes your expression in plain English. !* urgente',
// );
// getPromptData(
//     '! sacar las bolsas de la durante 3 meses basura #casa tengo 10 minutos,',
// );
// getPromptData('Hakuna matata todos los 15 de febrero');
