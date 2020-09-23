import STATUS from '../../enums/core/status';

import {
    mutate
} from '../store';

export default function setStatus(status: STATUS = null): void {
    mutate(state => state.status = status);
}