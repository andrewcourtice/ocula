import ICON from './icon';

import {
    formatBlock
} from '../helpers/format-data';

import {
    dateFromUnix
} from '@ocula/utilities';

export default {
    distance: {
        millimeters: 'mm',
        centimetres: 'cm',
        kilometres: 'km',
        miles: 'mi',
        inches: 'in'
    },
    speed: {
        millimetresPerHour: 'mm/h',
        kilometresPerHour: 'km/h',
        metresPerSecond: 'm/s',
        inchesPerHour: 'mi/h',
        milesPerHour: 'mi/h'
    },
    temperature: {
        celcius: value => `${Math.round(value)}°C`,
        fahrenheit: value => `${Math.round(value)}°F`,
    },
    pressure: {
        hectopascals: 'hPa',
        millibars: 'bar'
    },
    direction: {
        bearing: '°'
    },
    general: {
        datetime: dateFromUnix,
        icon: value => ICON[value],
        percentage: value => `${Math.round(value * 100)}%`
    },
    iteration: {
        object: schema => value => formatBlock(value, schema),
        array: schema => value => value.map(item => formatBlock(item, schema))
    }
};