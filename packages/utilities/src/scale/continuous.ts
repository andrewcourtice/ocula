import scale from './_base/scale';

import type {
    IScale
} from './_base/scale';

export default function continuous(
    domain: number[],
    range: number[],
): IScale {
    const [
        domainMin,
        domainMax
    ] = domain;

    const [
        rangeMin,
        rangeMax
    ] = range;

    const domainLength = domainMax - domainMin;
    const rangeLength = rangeMax - rangeMin;

    return scale(domain, range, value => {
        return (value - domainMin) * rangeLength / domainLength + rangeMin;
    });
};