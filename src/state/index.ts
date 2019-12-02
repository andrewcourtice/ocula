import MODULES from '../constants/modules';

import location from './location/index';
import settings from './settings/index';
import weather from './weather/index';

export default {
    devtools: true,

    modules: {
        [MODULES.location]: location,
        [MODULES.settings]: settings,
        [MODULES.weather]: weather
    }
};