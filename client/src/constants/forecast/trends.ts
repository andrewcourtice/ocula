import TREND from '../../enums/forecast/trend';
import OBSERVATION from '../../enums/forecast/observation';

import {
    LINE_TYPE,
    SCALE_TYPE,
    ILineOptions
} from '@ocula/charts';

import {
    objectMerge,
    dateFromUnix,
    numberPercentage
} from '@ocula/utilities';

import type {
    IForecastHour
} from '../../types/weather';

import {
    Formatted
} from '../../types/state';

type ChartOptions = ILineOptions<Formatted<IForecastHour>>;

interface ITrend {
    icon: string;
    label: string;
    observation: OBSERVATION;
    chartOptions: ChartOptions;
}

const BASE_OPTIONS = {
    type: LINE_TYPE.spline,
    scales: {
        x: {
            type: SCALE_TYPE.time,
            value: ({ dt }) => dateFromUnix(dt.raw)
        },
        y: {
            type: SCALE_TYPE.linear,
            ticks: 5
        }
    },
    labels: {
        content: (point, index) => index ? Math.round(point.yValue) : null
    },
    colours: {
        tick: '#AAA'
    },
    padding: {
        bottom: 0
    }
} as ChartOptions;

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
                content: (point, index) => index ? numberPercentage(point.yValue, 1) : null
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