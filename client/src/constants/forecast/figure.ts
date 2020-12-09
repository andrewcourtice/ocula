import figures from '../../assets/images/figures';
import PHASE from '../../enums/forecast/phase';

interface IFigure extends Record<number, string> {};

export default {
    [PHASE.day]: {
        200: figures.storm,
        300: figures.lightRain,
        500: figures.rain,
        600: figures.snow,
        700: figures.partlyCloudyDay,
        800: figures.sun,
        801: figures.partlyCloudyDay,
        802: figures.partlyCloudyDay,
        803: figures.partlyCloudyDay,
        804: figures.partlyCloudyDay,
    },
    [PHASE.night]: {
        200: figures.stormyNight,
        300: figures.rainyNight,
        500: figures.rainyNight,
        600: figures.snow,
        700: figures.partlyCloudyNight,
        800: figures.fullMoon,
        801: figures.partlyCloudyNight,
        802: figures.partlyCloudyNight,
        803: figures.partlyCloudyNight,
        804: figures.partlyCloudyNight,
    }
} as Record<PHASE, IFigure>;