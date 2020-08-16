import THEME from '../../constants/theme';

import {
    getter
} from '../store';

import {
    core,
    weather
} from '@ocula/themes';

export default getter(({ settings, forecast }) => {
    const {
        theme
    } = settings;

    let coreTheme = core[theme] || core.default;
    let weatherTheme = weather.default;
    
    if (forecast && forecast.current) {
        weatherTheme = THEME[forecast.current.weather[0].id] || weather.default;
    }

    return {
        core: coreTheme,
        weather: weatherTheme
    };
});