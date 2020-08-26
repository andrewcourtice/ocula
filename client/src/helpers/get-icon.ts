import ICON from '../constants/forecast/icon';
import PHASE from '../enums/forecast/phase';

import {
    phase
} from '../store';

export default function getIcon(conditionId: number): string {
    const phaseIcon = ICON[phase.value] || PHASE.day;

    return phaseIcon[conditionId] || phaseIcon[Math.floor(conditionId / 100) * 100] || phaseIcon['800'];
}