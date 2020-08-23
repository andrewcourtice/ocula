import FIGURE from '../constants/forecast/figure';

export default function getFigure(conditionId: number): string {
    return FIGURE[conditionId] || FIGURE[Math.floor(conditionId / 100) * 100] || FIGURE['800'];
}