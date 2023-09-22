const { eventNames } = require("process");

const listeners = {};

const publisher = (eventName, ...eventArgs) => {
    if (!listeners[eventName]) {
        return;
    }

    listeners[eventName].forEach((listener) => listener(...eventArgs));
};

const subscribe = (eventName, eventListener) => {

    if (!listeners[eventName]) {
        listeners[eventName] = [];
    }
    listeners[eventName].push(eventListener);

    return () => {
        console.log(`You have been Unsubscribed from ${eventName}`);
        listeners[eventName] = listeners[eventName]
            .filter((listeners) => listeners !== eventListener);
        console.log('After unsubs!');

    };
};

const eventBus = {
    publisher,
    subscribe
};
module.exports = eventBus;