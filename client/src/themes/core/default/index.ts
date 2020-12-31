import './index.scss';

import PHASE from '../../../enums/forecast/phase';

import type {
    ITheme
} from '../../../types/themes';

export default {
    id: 'default',
    name: 'Default',
    colour: {
        [PHASE.night as string]: '#333333'
    },
    class: 'theme--default',
    mapStyle: {
        [PHASE.night as string]: 'dark'
    }
} as ITheme;