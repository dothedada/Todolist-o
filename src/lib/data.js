const exp = {
    project: /@[a-zA-ZÀ-ÿ]+/,
    category: /#[a-zA-ZÀ-ÿ]+/g,

    // prettier-ignore
    es: {
        relevance: /[*!]\B|(importante|urgente)\b/gi,
        timer: /(t:|tengo) ?([0-9.,]+) ?(minutos?|min|m|horas?|h)\b/i,
	loopAbsolute: /todos los (lunes|martes|mi.rcoles|jueves|viernes|s.bado|domingo|[0-9]{1,2})/i,
	loopRelative: /cada ([0-9]{1,2}) (dia|semana|mes)/i,
	loopCount: /(durante )?(()|([0-9]) veces)/i,

        // WARN: revisar si la abreviación de los meses puede causar algún error
        date1: /([0-9]{1,2})(\/[0-9]{1,2}| de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre))/i,
        date2: /(dentro de |de (hoy|ma.ana|este (lunes|martes|miercoles|jueves|viernes|sabado|domingo)) en |en )([0-9]+ )(dia.|semana.)/i,
	date3: /(el |este |el proximo )(lunes|martes|miercoles|jueves|viernes|sabado|domingo)/i,
        date4: /(pasado )?(hoy |ma.ana )/i,

        week: /lunes|martes|miercoles|jueves|viernes|sabado|domingo/i,
        months: /enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre/i,
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
