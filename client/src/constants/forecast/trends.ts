import TREND from '../../enums/forecast/trend';
import OBSERVATION from '../../enums/forecast/observation';

import {
    LINE_TYPE
} from '@ocula/charts';

import {
    objectMerge,
    dateFromUnix,
    numberPercentage
} from '@ocula/utilities';

interface ITrend {
    icon: string;
    label: string;
    observation: OBSERVATION;
    chartOptions: any;
}

const BASE_OPTIONS = {
    type: LINE_TYPE.spline,
    scales: {
        x: {
            type: 'time',
            value: ({ dt }) => dateFromUnix(dt.raw)
        },
        y: {
            type: 'linear',
            ticks: 5
        }
    },
    labels: {
        content: (value, index) => index ? Math.round(value) : null
    },
    colours: {
        axis: false,
        tick: '#AAA'
    }
};

export default {
    [TREND.temperature]: {
        icon: 'temp-cold-line',
        label: 'Temperature',
        observation: OBSERVATION.temperature,
        chartOptions: objectMerge(BASE_OPTIONS, {
            scales: {
                y: {
                    value: ({ temp }) => temp.raw
                }
            },
            colours: {
                line: '#47B1FA',
                marker: '#47B1FA'
            }
        })
    },
    [TREND.rainfall]: {
        icon: 'rainy-line',
        label: 'Precipitation',
        observation: OBSERVATION.precipitation,
        chartOptions: objectMerge(BASE_OPTIONS, {
            type: LINE_TYPE.step,
            scales: {
                y: {
                    value: ({ pop }) => pop.raw
                }
            },
            labels: {
                content: (value, index) => index ? numberPercentage(value, 1) : null
            },
            colours: {
                line: '#47B1FA',
                marker: '#47B1FA'
            }
        })
    },
    [TREND.wind]: {
        icon: 'windy-line',
        label: 'Wind',
        observation: OBSERVATION.windSpeed,
        chartOptions: objectMerge(BASE_OPTIONS, {
            scales: {
                y: {
                    value: ({ windSpeed }) => windSpeed.raw
                }
            },
            colours: {
                line: '#47B1FA',
                marker: '#47B1FA'
            }
        })
    }
} as Record<TREND, ITrend>;