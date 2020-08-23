import THEME from '../../constants/forecast/theme';

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
        const conditionId = forecast.current.weather[0].id;

        weatherTheme = THEME[conditionId] || THEME[Math.floor(conditionId / 100) * 100] || weather.default;
    }

    return {
        core: coreTheme,
        weather: weatherTheme
    };
});