import createStore from '@ocula/state';

import _state from './state/index';

export const {
    state,
    getter,
    mutate
} = createStore(_state);