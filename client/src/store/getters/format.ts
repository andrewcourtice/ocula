import {
    getter
} from '../store';

import {
    dateFormat,
    dateUtcToZoned
} from '@ocula/utilities';

import type {
    IFormatter
} from '../../interfaces/state';

export default getter<IFormatter>(({ forecast }) => {
    let options;
    let converter = value => value;

    const output = {
        date: (value: Date, format: string = 'EEEE, d MMM') => dateFormat(converter(value), format, options),
        time: (value: Date, format: string = 'h:mm a') => dateFormat(converter(value), format, options).toLowerCase()
    };

    if (forecast && forecast.timezone) {
        converter = value => dateUtcToZoned(value, forecast.timezone);
        
        options = {
            timeZone: forecast.timezone
        };
    }

    return output;
});