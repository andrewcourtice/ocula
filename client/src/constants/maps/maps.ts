import MAP from '../../enums/maps/map';

function getOwmTileUrl(layer: string) {
    return `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${process.env.OWM_API_KEY}`;
}

function getRadarTileUrl(forecast) {
    const timestamps = forecast.radar.raw.timestamps;
    const timestamp = timestamps[timestamps.length - 1];
    
    return `https://tilecache.rainviewer.com/v2/radar/${timestamp}/256/{z}/{x}/{y}/2/0_0.png`;
}

export default {
    [MAP.radar]: {
        label: 'Radar',
        icon: 'radar-line',
        options: {
            tiles: getRadarTileUrl
        }
    },
    [MAP.precipitation]: {
        label: 'Precipitation',
        icon: 'drop-line',
        options: {
            tiles: getOwmTileUrl('precipitation_new')
        }
    },
    [MAP.temperature]: {
        label: 'Temperature',
        icon: 'temp-cold-line',
        options: {
            tiles: getOwmTileUrl('temp_new')
        }
    },
    [MAP.cloud]: {
        label: 'Cloud',
        icon: 'cloudy-line',
        options: {
            tiles: getOwmTileUrl('clouds_new')
        }
    },
    [MAP.wind]: {
        label: 'Wind',
        icon: 'windy-line',
        options: {
            tiles: getOwmTileUrl('wind_new')
        }
    },
    [MAP.pressure]: {
        label: 'Pressure',
        icon: 'swap-line',
        options: {
            tiles: getOwmTileUrl('pressure_new')
        }
    }
} as const;