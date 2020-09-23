import UNIT_OF_MEASURE from '../../enums/forecast/unit-of-measure';

import getIcon from '../../helpers/get-icon';
import getDirection from '../../helpers/get-direction';

import {
    dateFromUnix,
    functionIdentity,
    stringCapitalize
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
    return value => baseFormatter(value, `${transformer(value)}${suffix}`);
}

export function defaultFormatter(value) {
    return baseFormatter(value, value);
}

export default {
    distance: {
        millimeters: toSuffix(UNIT_OF_MEASURE.millimeters),
        centimetres: toSuffix(UNIT_OF_MEASURE.centimetres),
        metres: toSuffix(UNIT_OF_MEASURE.metres),
        kilometres: toSuffix(UNIT_OF_MEASURE.kilometres),
        miles: toSuffix(UNIT_OF_MEASURE.miles),
        inches: toSuffix(UNIT_OF_MEASURE.inches)
    },
    speed: {
        millimetresPerHour: toSuffix(UNIT_OF_MEASURE.millimetresPerHour),
        kilometresPerHour: toSuffix(UNIT_OF_MEASURE.kilometresPerHour),
        metresPerSecond: toSuffix(UNIT_OF_MEASURE.metresPerSecond),
        inchesPerHour: toSuffix(UNIT_OF_MEASURE.inchesPerHour),
        milesPerHour: toSuffix(UNIT_OF_MEASURE.milesPerHour)
    },
    temperature: {
        celcius: toSuffix(UNIT_OF_MEASURE.celcius, Math.round),
        fahrenheit: toSuffix(UNIT_OF_MEASURE.fahrenheit, Math.round),
    },
    pressure: {
        hectopascals: toSuffix(UNIT_OF_MEASURE.hectopascals),
        millibars: toSuffix(UNIT_OF_MEASURE.millibars)
    },
    direction: {
        bearing: value => baseFormatter(value, getDirection(value))
    },
    general: {
        description: value => baseFormatter(value, stringCapitalize(value)),
        datetime: value => baseFormatter(value, dateFromUnix(value)),
        icon: value => baseFormatter(value, getIcon(value)),
        percentage: toSuffix(UNIT_OF_MEASURE.percentage, value => Math.round(value)),
        fractional: toSuffix(UNIT_OF_MEASURE.percentage, value => Math.round(value * 100))
    }
};