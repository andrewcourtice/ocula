import ICON from './icon';

import {
    dateFromUnix,
    functionIdentity
} from '@ocula/utilities';

function baseFormatter<T>(raw: T, formatted: any) {
    return {
        raw,
        formatted,

        toString() {
            return formatted;
        }
    };
};

function toSuffix(suffix: string, transformer: Function = functionIdentity) {
    return value => baseFormatter(value, `${transformer(value)} ${suffix}`);
}

export function defaultFormatter(value) {
    return baseFormatter(value, value);
}

export default {
    distance: {
        millimeters: toSuffix('mm'),
        centimetres: toSuffix('cm'),
        kilometres: toSuffix('km'),
        miles: toSuffix('mi'),
        inches: toSuffix('in')
    },
    speed: {
        millimetresPerHour: toSuffix('mm/h'),
        kilometresPerHour: toSuffix('km/h'),
        metresPerSecond: toSuffix('m/s'),
        inchesPerHour: toSuffix('mi/h'),
        milesPerHour: toSuffix('mi/h')
    },
    temperature: {
        celcius: toSuffix('°C', Math.round),
        fahrenheit: toSuffix('°F', Math.round),
    },
    pressure: {
        hectopascals: toSuffix('hPa'),
        millibars: toSuffix('bar')
    },
    direction: {
        bearing: toSuffix('°')
    },
    general: {
        datetime: value => baseFormatter(value, dateFromUnix(value)),
        icon: value => baseFormatter(value, ICON[value]),
        percentage: toSuffix('%', value => Math.round(value))
    }
};