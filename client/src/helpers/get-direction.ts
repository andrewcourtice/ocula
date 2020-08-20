import DIRECTIONS from '../constants/directions';

const divisor = 360 / DIRECTIONS.length;

export default function getDirection(bearing: number): string {
    return DIRECTIONS[Math.floor(bearing / divisor)] || 'Unknown';
}