import {
    mutate
} from '../store';

export default function setLastUpdated(): void {
    mutate(state => state.lastUpdated = new Date());
}