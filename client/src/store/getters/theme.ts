import THEME from '../../constants/theme';

import {
    getter
} from '../store';

import {
    core
} from '@ocula/themes';

export default getter(({ settings, forecast }) => {
    const {
        theme
    } = settings;

    let coreTheme = core[theme] || core.default;
    let weatherTheme = THEME['800']
    
    if (forecast && forecast.current) {
        weatherTheme = THEME[forecast.current.weather[0].id] || THEME['800'];
    }

    return {
        core: coreTheme,
        weather: weatherTheme
    };
});