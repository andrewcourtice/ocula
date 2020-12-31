import * as d3 from '../d3';

export default function(data, options, range) {
    const {
        value
    } = options;

    const domain = d3.extent(data, value);

    return d3.scaleTime()
        .domain(domain)
        .range(range);
}