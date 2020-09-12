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
        icon: 'temp-cold-line',
        label: 'Temp Min',
        getValue: (forecast) => forecast.today.temp.min.formatted
    },
    [OBSERVATION.tempMax]: {
        icon: 'temp-hot-line',
        label: 'Temp Max',
        getValue: (forecast) => forecast.today.temp.max.formatted
    },
    [OBSERVATION.precipitation]: {
        icon: 'rainy-line',
        label: 'Precipitation',
        getValue: (forecast) => {
            const {
                pop
            } = forecast.today;
            
            return pop.raw > 0 ? pop.formatted : 'n/a';
        }
    },
    [OBSERVATION.humidity]: {
        icon: 'contrast-drop-2-line',
        label: 'Humidity',
        getValue: (forecast) => forecast.current.humidity.formatted
    },
    [OBSERVATION.sunrise]: {
        icon: 'sun-line',
        label: 'Sunrise',
        getValue: (forecast, format) => format.time(forecast.today.sunrise.formatted as any)
    },
    [OBSERVATION.sunset]: {
        icon: 'moon-line',
        label: 'Sunset',
        getValue: (forecast, format) => format.time(forecast.today.sunset.formatted as any)
    },
    [OBSERVATION.windSpeed]: {
        icon: 'windy-line',
        label: 'Wind Speed',
        getValue: (forecast) => forecast.current.windSpeed.formatted
    },
    [OBSERVATION.windDirection]: {
        icon: 'compass-3-line',
        label: 'Wind Direction',
        getValue: (forecast) => forecast.current.windDeg.formatted
    },
} as Record<OBSERVATION, IObservation>;