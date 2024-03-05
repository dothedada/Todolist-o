import './reset.css'; // reset de estilos
import './styles.css'; // estilos del proyecto

// Expresions dictionary
const exp = {
    project: /@[a-z0-9-]+/gi,
    category: /#[a-z0-9-]+/gi,

    // prettier-ignore
    esp: {
        relevance: /[*!]\B|(importante|urgente)\b/gi,
        timer: /(t:|tengo)\s?([0-9.,]+)\s?(minutos|min|m|horas|h)\b/i,
        date1: /([0-9]{1,2})(\/[0-9]{1,2}|\sde\s[ad-fjm-os][a-jl-vy-z]{3,9})/i,
	date2: /(pasado\s)?(hoy|ma.ana)/i,
	date3: /(el\s|este\s|el\spr.ximo\s)((lun|mart|mi.rcol|juev|viern)es|(s.bado|domingo))/i,
	date4: /(dentro\sde\s|de\s(hoy\s|ma.ana\s|este\s((lun|mart|mi.rcol|juev|viern)es|(s.bado|domingo))(\sen\s)?))((en\s)?([0-9]+))(\sd.as|\ssemanas|\smeses)?/i,
	recurrent: /(durante|todos\slos|cada)\s(((lun|mart|mi.rcol|juev|viern)es|(s.bado|domingo))|[0-9]+\s(d.as|meses))/i,
	recurrentLimit: /[0-9]\sveces/i,
    },
    eng: {},
};

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

const getPromptData = (str) => {
    const task = {};
    const prompt = str.replace(/\s{2,}/g, ' ');
    const project = prompt.match(exp.project);
    const category = prompt.match(exp.category);
    let relevance = prompt.match(exp.esp.relevance);
    relevance = relevance ? relevance.pop() : '';
    const timer = prompt.match(exp.esp.timer);

    const recurrent = prompt.match(exp.esp.recurrent);
    const recurrentLimit = prompt.match(exp.esp.recurrentLimit);
    const dueDate =
        prompt.match(exp.esp.date1) ||
        prompt.match(exp.esp.date4) ||
        prompt.match(exp.esp.date3) ||
        prompt.match(exp.esp.date2);


    task.promt = prompt;
    task.project = project ? project[0] : false;
    task.category = category ? category.slice(0, 2) : false;
    task.important = /\*|important/i.test(relevance);
    task.urgent = /!|urgente/i.test(relevance);
    task.timer = timer ? timerToSeconds(timer) : false;

    const setDate = new Date()
    task.currentDate = `${setDate.getDay()}/${setDate.getMonth()}/${setDate.getFullYear()}`
    task.done = false

    console.log(
        'due:',
        dueDate,
        'rec:',
        recurrent,
        'times:',
        recurrentLimit,
    );

    return task;
};

getPromptData(
    'holi  12/mar ca   re @verga sucia t:2h #emb#ol1asdf tengo 1.5 minutos 3 * veces',
);
getPromptData(
    '! Explore mañana re*sults * w!ith !the de este #domingo en 8 días below. Replace & List output todos los lunes custom results. Details lists capture @gr213oups. Explain urgente describes your expression in plain English. !* urgente',
);
getPromptData('! sacar las bolsas de la basura #casa tengo 10 minutos,');
