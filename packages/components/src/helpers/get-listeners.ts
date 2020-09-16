import {
    typeIsFunction
} from '@ocula/utilities';

export default function getListeners(attrs: Record<string, any>): Record<string, Function> {
    const listeners = {};

    for (const key in attrs) {
        const value = attrs[key];

        if (key.startsWith('on') && typeIsFunction(value)) {
            listeners[key.replace(/^on/, '').toLowerCase()] = value;
        }
    }

    return listeners;
}