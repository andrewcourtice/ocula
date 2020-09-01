import './index.scss';

import PHASE from '../../../enums/forecast/phase';

import type {
    ITheme
} from '../../../interfaces/themes';

export default {
    id: 'weather-clear',
    name: 'Clear',
    colour: {
        [PHASE.day as string]: '#5D9BE5',
        [PHASE.night as string]: '#44296A'
    },
    class: 'theme--weather-clear',
    mapStyle: {
        [PHASE.night as string]: 'dark'
    }
} as ITheme;