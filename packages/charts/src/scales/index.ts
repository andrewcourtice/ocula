import SCALE from '../enums/scale';

import linear from './linear';
import point from './point';
import time from './time';

export const SCALES = {
    [SCALE.linear]: linear,
    [SCALE.point]: point,
    [SCALE.time]: time
};

export function getScale(data, options, range) {
    const {
        type
    } = options;

    return (SCALES[type] || SCALES[SCALE.linear])(data, options, range);
}

export default SCALES;