import {
    createStore
} from '@harlem/core';

import {
    getState
} from './state';

export const {
    state,
    getter,
    mutation
} = createStore('data', getState());