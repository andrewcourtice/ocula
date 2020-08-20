import {
    getter
} from '../store';

import {
    dateFormat,
    dateUtcToZoned
} from '@ocula/utilities';

export default getter(({ forecast }) => {
    let options;
    let converter = value => value;

    const output = {
        date: (value: Date, format: string = 'EEEE, d MMM') => dateFormat(converter(value), format, options),
        time: (value: Date, format: string = 'hh:mm a') => dateFormat(converter(value), format, options)
    };

    if (forecast && forecast.timezone) {
        converter = value => dateUtcToZoned(value, forecast.timezone);
        
        options = {
            timeZone: forecast.timezone
        };
    }

    return output;
});