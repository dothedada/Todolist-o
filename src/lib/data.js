const exp = {
    project: /\B(?:@[a-zA-ZÀ-ÿ]+)/g,
    category: /\B(?:#[a-zA-ZÀ-ÿ]+)/g,
    mailOrUrl: /([a-z0-9\-|.]+@[a-z0-9\-]+\.[a-z0-9\-.]+)|((?:https?:\/\/)?(?:[a-z0-9\-]+\.)?([a-z0-9\-]{1,63}\.[a-z0-9]+)(?:\/[\/\w\d\-\+\.\*$%?#]+)?)/ig,

    // prettier-ignore
    es: {
        relevance: /[*!]\B|(importante|urgente)\b/gi,
        timer: /(t:|tengo) ?([0-9.,]+) ?(minutos?|min|m|horas?|h)\b/i,
	loopAbsolute: /todos los (lunes|martes|mi.rcoles|jueves|viernes|s.bado|domingo|[0-9]{1,2})/i,
	loopRelative: /cada ([0-9]{1,2}) (dia|semana|mes)/i,
	loopPeriod: /durante (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|(([0-9]{1,2}) mes(?:es)?) )|([0-9]) veces/i,

        date1: /([0-9]{1,2})(\/[0-9]{1,2}| de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre))/i,
        date2: /(dentro de |de (hoy|ma.ana|este (lunes|martes|miercoles|jueves|viernes|sabado|domingo)) en |en )([0-9]+ )(dia.|semana.)/i,
	date3: /(el |este |el proximo )(lunes|martes|miercoles|jueves|viernes|sabado|domingo)/i,
        date4: /(pasado )?(hoy|ma.ana)/i,

        week: /lunes|martes|miercoles|jueves|viernes|sabado|domingo/i,
        months: /enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre/i,
    },

    en: {
        //        relevance: /[*!]\B|(important|urgent)\b/gi,
        //        timer: /(t:|tengo) ?([0-9.,]+) ?(minutos?|min|m|horas?|h)\b/i,
        // loopAbsolute: /todos los (lunes|martes|mi.rcoles|jueves|viernes|s.bado|domingo|[0-9]{1,2})/i,
        // loopRelative: /cada ([0-9]{1,2}) (dia|semana|mes)/i,
        // loopPeriod: /durante (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|([0-9]{1,2}) mes(es)?) |([0-9]) veces/i,
        //
        //        date1: /([0-9]{1,2})(\/[0-9]{1,2}| de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre))/i,
        //        date2: /(dentro de |de (hoy|ma.ana|este (lunes|martes|miercoles|jueves|viernes|sabado|domingo)) en |en )([0-9]+ )(dia.|semana.)/i,
        // date3: /(el |este |el proximo )(lunes|martes|miercoles|jueves|viernes|sabado|domingo)/i,
        //        date4: /(pasado )?(hoy|ma.ana)/i,
        //
        //        week: /lunes|martes|miercoles|jueves|viernes|sabado|domingo/i,
        //        months: /enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre/i,
    },
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
    en: [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'fryday',
        'saturday',
    ],
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
    en: [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
    ],
};

export { exp, daysWeek, months };
