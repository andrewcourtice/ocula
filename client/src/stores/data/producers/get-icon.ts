import ICON from '../../../constants/forecast/icon';
import PHASE from '../../../enums/forecast/phase';

import getPhase from './get-phase';

export default function getIcon(conditionId: number, timestamp?: number): string {
    let phase = PHASE.day;

    if (timestamp) {
        phase = getPhase(timestamp);
    }
    
    const phaseIcon = ICON[phase];

    return phaseIcon[conditionId] || phaseIcon[Math.floor(conditionId / 100) * 100] || phaseIcon['800'];
}