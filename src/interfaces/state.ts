import ISettings from './settings';

export default interface IState {
    weather: {
        forecast: object
    },
    settings: ISettings
};