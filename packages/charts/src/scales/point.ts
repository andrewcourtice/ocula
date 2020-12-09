import * as d3 from '../d3';

export default function(data, options, range) {
    const {
        value
    } = options;

    const domain = data.map(value);

    return d3.scalePoint()
        .domain(domain)
        .range(range);
}