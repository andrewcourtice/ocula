import FIGURE from '../constants/forecast/figure';

import {
    phase
} from '../store';

export default function getFigure(conditionId: number): string {
    const figurePhase = FIGURE[phase.value] || FIGURE.day;

    return figurePhase[conditionId] || figurePhase[Math.floor(conditionId / 100) * 100] || figurePhase['800'];
}