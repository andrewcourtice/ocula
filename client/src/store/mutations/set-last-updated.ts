import {
    mutate
} from '../store';

export default function setLastUpdated(value: Date | null = new Date()): void {
    mutate(state => state.lastUpdated = value);
}