import scale from './_base/scale';

import type {
    IScale
} from './_base/scale';

export default function discrete<T>(
    domain: T[],
    range: number[],
): IScale<T> {
    const [
        rangeMin,
        rangeMax
    ] = range;

    const rangeLength = rangeMax - rangeMin;
    const domainLength = domain.length;
    const step = rangeLength / domainLength;

    return scale(domain, range, value => {
        return rangeMin + (domain.indexOf(value) * step);
    });
};