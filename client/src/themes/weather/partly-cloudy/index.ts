import './index.scss';

import PHASE from '../../../enums/forecast/phase';

import type {
    ITheme
} from '../../../types/themes';

export default {
    id: 'weather-partly-cloudy',
    name: 'Partly Cloudy',
    colour: {
        [PHASE.day as string]: '#5D9BE5',
        [PHASE.night as string]: '#44296A'
    },
    class: 'theme--weather-partly-cloudy',
    mapStyle: {
        [PHASE.night as string]: 'dark'
    }
} as ITheme;