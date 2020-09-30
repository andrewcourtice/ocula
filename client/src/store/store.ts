import createStore from '@ocula/state';

import _state from './state';

export const {
    state,
    getter,
    mutate
} = createStore('ocula', _state);