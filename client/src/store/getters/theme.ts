import THEME from '../../constants/forecast/theme';

import phase from './phase';

import {
    getter
} from '../store';

import {
    core,
    weather
} from '../../themes';

import type {
    ITheme
} from '../../types/themes';

import {
    typeIsPlainObject
} from '@ocula/utilities';

function getPhasedTheme(theme: ITheme): ITheme {
    let {
        colour,
        mapStyle,
        ...value
    } = theme;

    if (typeIsPlainObject(colour)) {
        colour = colour[phase.value]
    }

    if (typeIsPlainObject(mapStyle)) {
        mapStyle = mapStyle[phase.value];
    }

    return {
        ...value,
        colour,
        mapStyle
    };
}

export default getter(({ settings, forecast }) => {
    const {
        theme
    } = settings;
    
    let coreTheme = core[theme] || core.default;
    let weatherTheme = weather.default;

    coreTheme = getPhasedTheme(coreTheme);
    
    if (forecast && forecast.current) {
        const conditionId = forecast.current.weather[0].id;

        weatherTheme = THEME[conditionId] || THEME[Math.floor(conditionId / 100) * 100] || weather.default;
        weatherTheme = getPhasedTheme(weatherTheme);
    }

    return {
        core: coreTheme,
        weather: weatherTheme
    };
});