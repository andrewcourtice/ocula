import {
    dateFormat
} from '@ocula/utilities';

export default {
    distance: {
        Millimeters: 'mm',
        Centimetres: 'cm',
        Kilometres: 'km',
        miles: 'mi',
        inches: 'in'
    },
    speed: {
        MillimetresPerHour: 'mm/h',
        KilometresPerHour: 'km/h',
        MetresPerSecond: 'm/s',
        MilesPerHour: 'mi/h'
    },
    temperature: {
        celcius: '°C',
        fahrenheit: '°F',
    },
    pressure: {
        Hectopascals: 'hPa',
        Millibars: 'bar'
    },
    general: {
        percentage: value => `${Math.round(value * 100)}%`,
        date: value => dateFormat(value, 'EEEE, d MMM'),
        time: value => dateFormat(value, 'h:mm a')
    }
};