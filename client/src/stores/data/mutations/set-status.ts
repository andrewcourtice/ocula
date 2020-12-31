import {
    mutation
} from '../store';

import type {
    Status
} from '../../../types/storage';

export default mutation<Status>('setStatus', (state, payload = 'idle') => {
    state.status = payload;
});