import Chart from '../_base/chart';

import * as d3 from '@ocula/d3';

interface ISplineItem {
    label: string,
    value: number
};

interface ISplinePoint extends ISplineItem {
    x: number,
    y0: number,
    y1: number
};

const lineGenerator = d3.line<ISplinePoint>()
    .defined(data => !!data.y1)
    .x(data => data.x)
    .y(data => data.y1)
    .curve(d3.curveBasis);

const areaGenerator = d3.area<ISplinePoint>()
    .defined(data => !!data.y1)
    .x(data => data.x)
    .y0(data => data.y0)
    .y1(data => data.y1);

export default class SplineChart extends Chart {

    private gradient: d3.Selection<SVGLinearGradientElement, unknown, null, undefined>;
    private gradientStop1: d3.Selection<SVGStopElement, unknown, null, undefined>;
    private gradientStop2: d3.Selection<SVGStopElement, unknown, null, undefined>;
    private gradientStop3: d3.Selection<SVGStopElement, unknown, null, undefined>;

    private lineGroup: d3.Selection<SVGGElement, ISplinePoint[], null, undefined>;
    private markerGroup: d3.Selection<SVGGElement, ISplinePoint[], null, undefined>;

    constructor(element: Element) {
        super(element);

        this.lineGroup = this.canvas.append('g');
        this.markerGroup = this.canvas.append('g');

        this.gradient = this.svg.append('defs')
            .append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%');

        this.gradientStop1 = this.gradient.append('stop')
            .attr('offset', '0%')
            .style('stop-opacity', 1);

        this.gradientStop2 = this.gradient.append('stop')
            .attr('offset', '35%')
            .style('stop-opacity', 1);

        this.gradientStop3 = this.gradient.append('stop')
            .attr('offset', '90%')
            .style('stop-opacity', 1);
    }

    protected get defaultOptions() {
        return {
            ...super.defaultOptions,

            classes: {
                svg: 'spline-chart__svg',
                canvas: 'spline-chart__canvas',
                lineGroup: 'spline-chart__line-group',
                markerGroup: 'spline-chart__marker-group',
                line: 'spline-chart__line',
                area: 'spline-chart__area',
                marker: 'spline-chart__marker'
            },
            colours: {
                line: '#000000',
                marker: '#000000',
                gradient: {
                    stop1: '#000000',
                    stop2: '#888888',
                    stop3: '#EEEEEE',
                }
            }
        };
    }

    protected bootstrap(options) {
        super.bootstrap(options);

        const {
            classes,
            colours
        } = this.options;

        this.lineGroup.classed(classes.lineGroup, true);
        this.markerGroup.classed(classes.markerGroup, true);

        this.gradientStop1.style('stop-color', colours.gradient.stop1);
        this.gradientStop2.style('stop-color', colours.gradient.stop2);
        this.gradientStop3.style('stop-color', colours.gradient.stop3);
    }

    private async enter() {
        const {
            classes,
            colours
        } = this.options;

        const area = this.lineGroup.append('path')
            .classed(classes.area, true)
            .style('fill', 'url(#gradient)')
            .style('opacity', 0)
            .attr('d', areaGenerator);
    
        const line = this.lineGroup.append('path')
            .classed(classes.line, true)
            .attr('stroke', colours.line)
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('d', lineGenerator);
    
        this.markerGroup.selectAll('circle')
            .data(data => data)
            .join('circle')
            .classed(classes.marker, true)
            .attr('cx', data => data.x)
            .attr('cy', data => data.y1)
            .attr('r', 4)
            .attr('fill', colours.marker)
            .attr('stroke', '#FFFFFF')
            .attr('stroke-width', 2)
            .style('opacity', 0);
    
        const lineLength = line.node().getTotalLength();
    
        line.attr('stroke-dasharray', lineLength)
            .attr('stroke-dashoffset', lineLength);
        
        await line.transition()
            .duration(1000)
            .ease(d3.easePolyOut.exponent(4))
            .attr('stroke-dashoffset', 0)
            .end();

        line.attr('stroke-dasharray', null);

        return area.transition()
            .duration(1000)
            .ease(d3.easePolyOut.exponent(4))
            .style('opacity', 1)
            .end();
    }
    
    private async update() {
        const {
            classes
        } = this.options;

        const timing = 1000;

        const area = this.lineGroup.select(`.${classes.area}`);
        const line = this.lineGroup.select(`.${classes.line}`);
    
        const markers = this.markerGroup.selectAll(`.${classes.marker}`)
            .data(data => data);
    
        const areaTransition = area.transition()
            .duration(timing)
            .ease(d3.easePolyOut.exponent(4))
            .attr('d', areaGenerator)
            .end();
    
        const lineTransition = line.transition()
            .duration(timing)
            .ease(d3.easePolyOut.exponent(4))
            .attr('d', lineGenerator)
            .end();
    
        markers.transition()
            .duration(timing)
            .ease(d3.easePolyOut.exponent(4))
            .attr('cx', data => data.x)
            .attr('cy', data => data.y1);
    
        return Promise.all([
            areaTransition,
            lineTransition
        ]);
    }

    private async draw() {
        const path = this.lineGroup.select('path');
        const action = path.empty() ? this.enter : this.update;
    
        return action.call(this);
    }

    private calculate(data: ISplineItem[]) {
        const xDomain = data.map(item => item.label);
    
        const xScale = d3.scalePoint()
            .domain(xDomain)
            .range([0, this.width]);
    
        const extent = d3.extent(data, item => item.value);
        const yDomain = [Math.min(extent[0], 0), Math.max(extent[1], 0)];
        const rangePadding = this.height / 5;
    
        const yScale = d3.scaleLinear()
            .domain(yDomain)
            .range([this.height - rangePadding, rangePadding]);
    
        const points = data.map(({ label, value }) => ({
            label,
            value,
            x: xScale(label) as number,
            y0: this.height,
            y1: yScale(value) as number
        }));

        this.lineGroup.datum(points);
        this.markerGroup.datum(points);
    }

    public async render(data: ISplineItem[], options) {
        this.bootstrap(options);
        this.calculate(data);

        return this.draw();
    }

}