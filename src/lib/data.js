const exp = {
    project: /@[a-z0-9-]+/gi,
    category: /#[a-z0-9-]+/gi,

    // prettier-ignore
    es: {
        relevance: /[*!]\B|(importante|urgente)\b/gi,
        timer: /(t:|tengo)\s?([0-9.,]+)\s?(minutos|min|m|horas|h)\b/i,
	loopDef: /(todos\slos|cada)\s(lunes|martes|mi.rcoles|jueves|viernes|s.bado|domingo|[0-9]{1,2})\s(d.as|meses)?/i,
        // incorporar 'durante' en el loop count
	loopCount: /[0-9]\sveces/i,
        date1: /([0-9]{1,2})(\/[0-9]{1,2}|\sde\s[ad-fjm-os][a-jl-vy-z]{3,9})/i,
	date2: /(pasado\s)?(hoy|ma.ana)/i,
	date3: /(el\s|este\s|el\spr.ximo\s)((lun|mart|mi.rcol|juev|viern)es|(s.bado|domingo))/i,
	date4: /(dentro\sde\s|de\s(hoy\s|ma.ana\s|este\s((lun|mart|mi.rcol|juev|viern)es|(s.bado|domingo))(\sen\s)?))((en\s)?([0-9]+))(\sd.as|\ssemanas|\smeses)?/i,
    },
    en: {},
};

const daysWeek = {
    es: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
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

export { exp, daysWeek, months }
