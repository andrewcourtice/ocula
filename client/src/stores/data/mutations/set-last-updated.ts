import {
    mutation
} from '../store';

export default mutation<Date>('setLastUpdated', (state, payload = new Date()) => {
    state.lastUpdated = payload;
});