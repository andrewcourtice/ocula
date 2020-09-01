import TREND from '../../enums/forecast/trend';

import {
    LINE_TYPE
} from '@ocula/charts';

import {
    objectMerge,
    dateFromUnix,
    numberRound
} from '@ocula/utilities';

interface ITrend {
    icon: string;
    label: string;
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
        icon: 'thermometer',
        label: 'Temperature',
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
        icon: 'umbrella',
        label: 'Rainfall',
        chartOptions: objectMerge(BASE_OPTIONS, {
            type: LINE_TYPE.step,
            scales: {
                y: {
                    value: ({ pop }) => pop.raw
                }
            },
            labels: {
                content: (value, index) => index ? numberRound(value, 1) : null
            },
            colours: {
                line: '#47B1FA',
                marker: '#47B1FA'
            }
        })
    },
    [TREND.wind]: {
        icon: 'wind',
        label: 'Wind',
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