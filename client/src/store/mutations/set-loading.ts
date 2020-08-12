import {
    mutate
} from '../store';

export default function setLoading(value: boolean = true): void {
    mutate(state => state.loading = value);
}