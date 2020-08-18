import ICON from '../constants/icon';

export default function getIcon(conditionId: number): string {
    return ICON[conditionId] || ICON[Math.floor(conditionId / 100) * 100] || ICON['800'];
}