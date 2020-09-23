import round from './round';

export default function(value: number, precision: number = 0): string {
    return `${round(value * 100, precision)}%`;
}