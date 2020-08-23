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
        icon: 'target',
        options: {
            tiles: getRadarTileUrl
        }
    },
    [MAP.precipitation]: {
        label: 'Precipitation',
        icon: 'droplet',
        options: {
            tiles: getOwmTileUrl('precipitation_new')
        }
    },
    [MAP.temperature]: {
        label: 'Temperature',
        icon: 'thermometer',
        options: {
            tiles: getOwmTileUrl('temp_new')
        }
    },
    [MAP.cloud]: {
        label: 'Cloud',
        icon: 'cloud',
        options: {
            tiles: getOwmTileUrl('clouds_new')
        }
    },
    [MAP.wind]: {
        label: 'Wind',
        icon: 'wind',
        options: {
            tiles: getOwmTileUrl('wind_new')
        }
    },
    [MAP.pressure]: {
        label: 'Pressure',
        icon: 'disc',
        options: {
            tiles: getOwmTileUrl('pressure_new')
        }
    }
} as const;