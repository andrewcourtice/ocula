import {
    ILineOptions,
    LINE_TYPE
} from '@ocula/charts';

import {
    dateFromUnix,
    numberRound
} from '@ocula/utilities';

import type {
    Formatted
} from '../../interfaces/state';

import type {
    IForecastTideHeight
} from '../../interfaces/weather';

type ChartOptions = ILineOptions<Formatted<IForecastTideHeight>>;

export default {
    type: LINE_TYPE.spline,
    scales: {
        x: {
            type: 'time',
            value: ({ dt }) => dateFromUnix(dt.raw)
        },
        y: {
            type: 'linear',
            ticks: 5,
            value: ({ height }) => height.raw
        }
    },
    labels: {
        content: (point, index) => index ? numberRound(point.value.height.raw, 2) : null
    },
    colours: {
        line: '#47B1FA',
        marker: '#47B1FA'
    }
} as ChartOptions; 