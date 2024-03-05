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
//
const timerToSeconds = (tArr) => {
    const unit = /h/i.test(tArr[3][0]) ? 3600 : 60;
    return tArr[2] * unit;
};

// const hoy = new Date();
// hoy.setDate(hoy.getDate() + 8);

const getPromptData = (str) => {
    const task = {};
    const prompt = str.replace(/\s{2,}/g, ' ');

    const project = prompt.match(exp.project);
    const category = prompt.match(exp.category);
    const relevance = prompt.match(exp.es.relevance)
        ? prompt.match(exp.es.relevance).pop()
        : '';
    const timer = prompt.match(exp.es.timer);

    const recurrent = () => {
        if (!prompt.match(exp.es.loopDef)) return false;
        const period = prompt.match(exp.es.loopDef);

	if (/t/i.test(period[1][0])) return period[2]


	return period[1][0]

	// NOTE: a partir del día actual, marque el día que detona la tarea... o marca directa... o el día del mes (ojo fin de mes: 28,29,30,31)

    };

    // const recurrentLimit = prompt.match(exp.es.loopCount);
    // const dueDate =
    //     prompt.match(exp.es.date1) ||
    //     prompt.match(exp.es.date4) ||
    //     prompt.match(exp.es.date3) ||
    //     prompt.match(exp.es.date2);

    task.promt = prompt;
    task.project = project ? project[0] : false;
    task.category = category ? category.slice(0, 2) : false;
    task.important = /\*|important/i.test(relevance);
    task.urgent = /!|urgente/i.test(relevance);
    task.timer = timer ? timerToSeconds(timer) : false;
    task.recurrent = recurrent();
    task.while = 'loopCount || veces(num), días(num), mes(noviembre, enero) , meses (num)'

    const setDate = new Date();
    task.currentDate = `${setDate.getDate()}/${setDate.getMonth()}/${setDate.getFullYear()}`;
    task.done = false;

    console.table(task);

    return task;
};

getPromptData(
    'holi  12/mar ca todos los lunes  re @verga sucia t:2h #emb#ol1asdf tengo 1.5 minutos 3 * veces',
);
getPromptData(
    '! Explore mañana re*sults * w!ith !the de este #domingo en 8 días below. Replace & List output todos cada 8 días results. Details lists capture @gr213oups. Explain urgente describes your expression in plain English. !* urgente',
);
getPromptData(
    '! sacar las bolsas de la durante 3 meses basura #casa tengo 10 minutos,',
);
getPromptData('Hakuna matata todos los 15 de febrero');
