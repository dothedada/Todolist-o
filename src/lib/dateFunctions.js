const getDayMonthIndex = (dataSource, userString) =>
    dataSource.findIndex((element) => element === userString);


const getLastDayMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const setNextWeekDay = (userDayIndex, baseDate) =>
    userDayIndex < baseDate.getDay()
        ? baseDate.getDate() + userDayIndex + (7 - baseDate.getDay())
        : baseDate.getDate() + (userDayIndex - baseDate.getDay());

export { getDayMonthIndex, getLastDayMonth, setNextWeekDay }
