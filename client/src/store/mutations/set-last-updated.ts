import {
    mutate
} from '../store';

export default function setLastUpdated(value: Date | null = new Date()): void {
    mutate('set-last-updated', state => state.lastUpdated = value);
}