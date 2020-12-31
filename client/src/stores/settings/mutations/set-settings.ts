import {
    mutation
} from '../store';

import type {
    ISettings
} from '../../../types/storage';

export default mutation<Partial<ISettings>>('setSettings', (state, payload) => {
    if (payload) {
        Object.assign(state, payload);
    }
});