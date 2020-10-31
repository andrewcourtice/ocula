import MAP from '../../enums/maps/map';

import type {
    Formatted,
    IFormatter,
    IMappedForecast
} from '../../interfaces/state';

interface IMapLegend {
    colour: string;
    label: string;
}

interface IMapLayer {
    id: string;
    url: string;
    label?: string;
}

interface IMap {
    label: string;
    icon: string;
    layers: IMapLayer[] | (() => IMapLayer[]);
    legend?: IMapLegend[];
}

function getOwmTileUrl(layer: string): string {
    return `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${process.env.OWM_API_KEY}`;
}

function getRadarLayers(forecast: Formatted<IMappedForecast>, format: IFormatter, smooth: boolean = true, snow: boolean = true): IMapLayer[] {
    let timestamps = forecast.radar.timestamps;

    return timestamps.map(({ raw, formatted }) => ({
        id: raw.toString(),
        label: format.time(formatted),
        url: `https://tilecache.rainviewer.com/v2/radar/${raw}/256/{z}/{x}/{y}/2/${+smooth}_${+snow}.png`
    }));
}

export default {
    [MAP.radar]: {
        label: 'Radar',
        icon: 'radar-line',
        layers: getRadarLayers,
        legend: [
            {
                colour: '#8EE',
                label: 'Light Drizzle'
            },
            {
                colour: '#09C',
                label: 'Drizzle'
            },
            {
                colour: '#07A',
                label: 'Light Rain'
            },
            {
                colour: '#058',
                label: 'Light Rain'
            },
            {
                colour: '#FE0',
                label: 'Rain'
            },
            {
                colour: '#FA0',
                label: 'Rain'
            },
            {
                colour: '#F70',
                label: 'Heavy Rain'
            },
            {
                colour: '#F40',
                label: 'Heavy Rain'
            },
            {
                colour: '#E00',
                label: 'Thunderstorm'
            },
            {
                colour: '#900',
                label: 'Thunderstorm'
            },
            {
                colour: '#FAF',
                label: 'Hail'
            },
            {
                colour: '#F7F',
                label: 'Hail'
            }
        ]
    },
    [MAP.precipitation]: {
        label: 'Precipitation',
        icon: 'drop-line',
        layers: [
            {
                id: MAP.precipitation,
                url: getOwmTileUrl('precipitation_new')
            }
        ]
    },
    [MAP.temperature]: {
        label: 'Temperature',
        icon: 'temp-cold-line',
        layers: [
            {
                id: MAP.temperature,
                url: getOwmTileUrl('temp_new')
            }
        ]
    },
    [MAP.cloud]: {
        label: 'Cloud',
        icon: 'cloudy-line',
        layers: [
            {
                id: MAP.cloud,
                url: getOwmTileUrl('clouds_new')
            }
        ]
    },
    [MAP.wind]: {
        label: 'Wind',
        icon: 'windy-line',
        layers: [
            {
                id: MAP.wind,
                url: getOwmTileUrl('wind_new')
            }
        ]
    },
    [MAP.pressure]: {
        label: 'Pressure',
        icon: 'swap-line',
        layers: [
            {
                id: MAP.pressure,
                url: getOwmTileUrl('pressure_new')
            }
        ]
    }
} as Record<MAP, IMap>;