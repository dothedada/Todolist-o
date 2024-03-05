import './reset.css'; // reset de estilos
import './styles.css'; // estilos del proyecto

const regex = {
    project: /@[a-z0-9-]+/gi,
    category: /#[a-z0-9-]+/gi,

    esp: {
        relevance: /[*!]\B|(importante|urgente)\b/gi,
		timer: /(t:|tengo)\s?([0-9.,]+)\s?(minutos|min|m|horas|h)\b/i
    },
};

// const task = {
//     prompt: 'str',
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

const getPromptData = (str) => {
	const prompt = str.replace(/\s{2,}/g, ' ')
    const project = prompt.match(regex.project);
    const category = prompt.match(regex.category);
    const importantUrgent = prompt.match(regex.esp.relevance);
	const timer = prompt.match(regex.esp.timer)

    console.log(
		prompt,
		'pry:', project, 
		'cat:', category, 
		'imp:', importantUrgent,
		'tim:', timer
	);

    // return {
    //     prompt,
    // };
};

getPromptData('holi        ca   re @verga sucia t:2h #emb#ol1asdf tengo 1.5 minutos');
getPromptData(
    'Explore re*sults * w!ith !the Tools below. Replace & List output custom results. Details lists capture @gr213oups. Explain urgente describes your expression in plain English.',
);
