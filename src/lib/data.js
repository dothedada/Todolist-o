const exp = {
    project: /@[a-z0-9-]+/i,
    category: /#[a-z0-9-]+/gi,

    // prettier-ignore
    es: {
        relevance: /[*!]\B|(importante|urgente)\b/gi,
        timer: /(t:|tengo) ?([0-9.,]+) ?(minutos?|min|m|horas?|h)\b/i,
	loopAbsolute: /todos los (lunes|martes|miercoles|jueves|viernes|sabado|domingo|[0-9]{1,2})/i,
	loopRelative: /cada ([0-9]{1,2}) (dias|semanas|meses)?/i,
	loopCount: /[0-9] veces/i,

        // WARN: revisar si la abreviación de los meses puede causar algún error
        date1: /([0-9]{1,2})(\/[0-9]{1,2}| de [ad-fjm-os][a-jl-vy-z]{3,9})/i,
        date2: /(dentro de |de (hoy|ma.ana|este (lunes|martes|miercoles|jueves|viernes|sabado|domingo)) en )([0-9]+ )(dia.|semana.)?/i,
	date3: /(el |este |el proximo )(lunes|martes|miercoles|jueves|viernes|sabado|domingo)/i,
        date4: /(pasado )?(hoy |ma.ana )/i,
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
