const debounce = (callback, wait = 100) => {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(callback, wait);
    };
};

const taskEvent = () => {
    const events = {};

    const pub = (event, value) => {
        if (!events[event]) return;
        events[event].forEach((callback) => callback(value));
    };

    const sub = (event, callback) => {
        if (!events[event]) events[event] = [];
        events[event].push(callback);
    };

    return { pub, sub };
};

export { debounce, taskEvent };
