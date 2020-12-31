import * as d3 from '../d3';

export default function(data, options, range) {
    const {
        value
    } = options;

    const extent = d3.extent(data, value);
    const domain = [Math.min(extent[0], 0), Math.max(extent[1], 0)];
    
    return d3.scaleLinear()
        .domain(domain)
        .range(range)
        .nice();
}