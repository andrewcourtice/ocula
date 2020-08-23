interface IUVIndex {
    id: string;
    label: string;
    start: number;
    colour: string;
};

export default [
    {
        id: 'low',
        label: 'Low',
        start: 0,
        colour: '#3FA72D'
    },
    {
        id: 'moderate',
        label: 'Moderate',
        start: 3,
        colour: '#FFF301'
    },
    {
        id: 'high',
        label: 'High',
        start: 6,
        colour: '#F18B00'
    },
    {
        id: 'veryHigh',
        label: 'Very High',
        start: 8,
        colour: '#E53110'
    },
    {
        id: 'extreme',
        label: 'Extreme',
        start: 11,
        colour: '#B467A4'
    }
] as IUVIndex[];