import PHASE from '../../enums/forecast/phase';

export default {
    [PHASE.day]: {
        200: 'cloud-lightning',
        300: 'cloud-drizzle',
        500: 'cloud-rain',
        600: 'cloud-snow',
        700: 'cloud',
        800: 'sun',
        801: 'cloud',
        802: 'cloud',
        803: 'cloud',
        804: 'cloud'
    },
    [PHASE.night]: {
        200: 'cloud-lightning',
        300: 'cloud-drizzle',
        500: 'cloud-rain',
        600: 'cloud-snow',
        700: 'cloud',
        800: 'moon',
        801: 'cloud',
        802: 'cloud',
        803: 'cloud',
        804: 'cloud',
    }
};