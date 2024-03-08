const exp = {
    project: /@[a-z0-9-]+/gi,
    category: /#[a-z0-9-]+/gi,

    // prettier-ignore
    es: {
        relevance: /[*!]\B|(importante|urgente)\b/gi,
        timer: /(t:|tengo) ?([0-9.,]+) ?(minutos|min|m|horas?|h)\b/i,
        // NOTE: todos los 5 de cada mes
        // si hay definido día, la fecha de la tarea la da el loop
	loopAbsolute: /todos los (lunes|martes|mi.rcoles|jueves|viernes|s.bado|domingo|[0-9]{1,2})/i,
	loopRelative: /cada ([0-9]{1,2}) (d.as|meses)?/i,
	loopCount: /[0-9] veces/i,

        date1: /([0-9]{1,2})(\/[0-9]{1,2}| de [ad-fjm-os][a-jl-vy-z]{3,9})/i,
	date2: /(pasado )?(hoy|ma.ana)/i,
	date3: /(el |este |el pr.ximo )((lunes|martes|mi.rcoles|jueves|viernes|s.bado|domingo))/i,
	date4: /(dentro de |de (hoy |ma.ana |este ((lunes|martes|mi.rcoles|jueves|viernes|s.bado|domingo))( en )?))((en )?([0-9]+))( d.as| semanas| meses)?/i,
    },
    en: {},
};

const daysWeek = {
    es: [
        'domingo',
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado',
    ],
    en: [],
};
const months = {
    es: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
    ],
    en: [],
};

export { exp, daysWeek, months };
