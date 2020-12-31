import {
    createStore
} from '@harlem/core';

import {
    getSettings
} from '../../helpers/get-storage';

export const {
    state,
    getter,
    mutation
} = createStore('settings', getSettings());