import OBSERVATION from '../../enums/forecast/observation';

import {
    Formatted,
    IMappedForecast,
    IFormatter
} from '../../interfaces/state';

export interface IObservation {
    icon: string;
    label: string;
    getValue(forecast: Formatted<IMappedForecast>, format?: IFormatter): string;
}

export default {
    [OBSERVATION.tempMin]: {
        icon: 'thermometer',
        label: 'Temp Min',
        getValue: (forecast) => forecast.today.temp.min.formatted
    },
    [OBSERVATION.tempMax]: {
        icon: 'thermometer',
        label: 'Temp Max',
        getValue: (forecast) => forecast.today.temp.max.formatted
    },
    [OBSERVATION.precipitation]: {
        icon: 'umbrella',
        label: 'Precipitation',
        getValue: (forecast) => {
            const {
                pop
            } = forecast.today;
            
            return pop.raw > 0 ? pop.formatted : 'n/a';
        }
    },
    [OBSERVATION.humidity]: {
        icon: 'droplet',
        label: 'Humidity',
        getValue: (forecast) => forecast.current.humidity.formatted
    },
    [OBSERVATION.sunrise]: {
        icon: 'sunrise',
        label: 'Sunrise',
        getValue: (forecast, format) => format.time(forecast.today.sunrise.formatted as any)
    },
    [OBSERVATION.sunset]: {
        icon: 'sunset',
        label: 'Sunset',
        getValue: (forecast, format) => format.time(forecast.today.sunset.formatted as any)
    },
    [OBSERVATION.windSpeed]: {
        icon: 'wind',
        label: 'Wind Speed',
        getValue: (forecast) => forecast.current.windSpeed.formatted
    },
    [OBSERVATION.windDirection]: {
        icon: 'compass',
        label: 'Wind Direction',
        getValue: (forecast) => forecast.current.windDeg.formatted
    },
} as Record<OBSERVATION, IObservation>;