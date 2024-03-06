import './reset.css'; // reset de estilos
import './styles.css'; // estilos del proyecto
import { exp, daysWeek, months } from './data';

const timeToSeconds = (time, unit) => {
    const seconds = /h/i.test(unit) ? 3600 : 60;
    return time * seconds;
};

const debounce = (callback, wait = 100) => {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(callback, wait);
    };
};

const taskEvent = () => {
    const events = {}

    const pub = (event, value) => {
        if (!events[event]) return
        events[event].forEach(callback => callback(value))
    }

    const sub = (event, callback) => {
        if (!events[event]) events[event] = []
        events[event].push(callback)
    }

    return { pub, sub }
}

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
            ? timeToSeconds(
                  this.prompt.match(exp.es.timer)[2],
                  this.prompt.match(exp.es.timer)[3],
              )
            : false;
        this.timerPast = this.timer ? 0 : false;

        this.recurrent = exp.es.loopAbsolute.test(this.prompt);
        this.recurrentPeriod = this.recurrent
            ? this.prompt.match(exp.es.loopAbsolute)
            : false;
        this.recurrentCount = this.recurrent ? 0 : false;
        this.recurrentDateDefinition = false;
        this.recurrentCount = false;
        this.recurrentCountStart = false;
    }

    nextRecurrentDate() {
        console.log(this.recurrentDateDefinition);
    }

    readTask() {
        console.log(JSON.stringify(this, null, 2));
    }
}

const as = new Task(
    'mañiño   @holi  #carepa tengo 1 hora todos los 5 de cada mes lunes asd #chimuelo #carajillo urgEnte as',
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
