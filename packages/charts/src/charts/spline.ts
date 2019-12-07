import Chart from './_base/chart';

import * as d3 from '../d3/index';

interface ISplineItem {
    label: string,
    value: number
};

interface ISplinePoint extends ISplineItem {
    hidden?: boolean,
    x: number,
    y0: number,
    y1: number
};

const lineGenerator = d3.line<ISplinePoint>()
    .defined(data => !!data.y1)
    .x(data => data.x)
    .y(data => data.y1)
    .curve(d3.curveCatmullRom.alpha(1));

const areaGenerator = d3.area<ISplinePoint>()
    .defined(data => !!data.y1)
    .x(data => data.x)
    .y0(data => data.y0)
    .y1(data => data.y1)
    .curve(d3.curveCatmullRom.alpha(1));

export default class SplineChart extends Chart {

    private gradient: d3.Selection<SVGLinearGradientElement, unknown, null, undefined>;
    private gradientStop1: d3.Selection<SVGStopElement, unknown, null, undefined>;
    private gradientStop2: d3.Selection<SVGStopElement, unknown, null, undefined>;
    private gradientStop3: d3.Selection<SVGStopElement, unknown, null, undefined>;

    private lineGroup: d3.Selection<SVGGElement, ISplinePoint[], null, undefined>;
    private markerGroup: d3.Selection<SVGGElement, ISplinePoint[], null, undefined>;
    private gridGroup: d3.Selection<SVGGElement, ISplinePoint[], null, undefined>;

    constructor(element: Element) {
        super(element);

        this.gridGroup = this.canvas.append('g');
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
                label: '#AAAAAA',
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
            .style('fill-opacity', 0.75)
            .style('opacity', 0)
            .attr('d', areaGenerator);
    
        const line = this.lineGroup.append('path')
            .classed(classes.line, true)
            .attr('stroke', colours.line)
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('d', lineGenerator);

        const markerGroups = this.markerGroup.selectAll(`.${classes.marker}`)
            .data(data => data)
            .join('g')
            .filter(data => !data.hidden)
            .classed(classes.marker, true)
            .attr('transform', data => `translate(${data.x}, ${data.y1})`)
            .style('opacity', 0);
    
        markerGroups.append('circle')
            .attr('r', 3)
            .attr('fill', colours.marker)
            .attr('stroke', '#FFFFFF')
            .attr('stroke-width', 2);

        markerGroups.append('text')
            .text(data => data.value)
            .attr('dy', -12)
            .attr('fill', colours.label)
            .attr('text-anchor', 'middle')
            .style('font-size', '0.75rem');

        const gridLines = this.gridGroup.selectAll('line')
            .data(data => data)
            .join('line')
            .attr('x1', data => data.x)
            .attr('x2', data => data.x)
            .attr('y1', data => data.y1)
            .attr('y2', data => data.y0)
            .attr('stroke', colours.line)
            .attr('stroke-width', 1)
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

        const areaTransition = area.transition()
            .duration(1000)
            .ease(d3.easePolyOut.exponent(4))
            .style('opacity', 1)
            .end();

        const markerTransition = markerGroups.transition()
            .duration(1000)
            .ease(d3.easePolyOut.exponent(4))
            .style('opacity', 1)
            .end();

        const gridTransition = gridLines.transition()
            .duration(1000)
            .ease(d3.easePolyOut.exponent(4))
            .style('opacity', 1)
            .end();

        return Promise.all([
            areaTransition,
            markerTransition,
            gridTransition
        ]);
    }
    
    private async update() {
        const {
            classes
        } = this.options;

        const timing = 1000;

        const area = this.lineGroup.select(`.${classes.area}`);
        const line = this.lineGroup.select(`.${classes.line}`);

        const gridLines = this.gridGroup.selectAll('line')
            .data(data => data);
    
        const markers = this.markerGroup.selectAll(`.${classes.marker}`)
            .data(data => data);

        markers.select('text')
            .text(data => data.value)
    
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
        
        const gridTransition = gridLines.transition()
            .duration(timing)
            .ease(d3.easePolyOut.exponent(4))
            .attr('x1', data => data.x)
            .attr('x2', data => data.x)
            .attr('y1', data => data.y1)
            .attr('y2', data => data.y0)
    
        const markerTransition = markers.transition()
            .duration(timing)
            .ease(d3.easePolyOut.exponent(4))
            .attr('transform', data => `translate(${data.x}, ${data.y1})`);
    
        return Promise.all([
            areaTransition,
            lineTransition,
            markerTransition,
            gridTransition
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
            .range([0, this.width])
            .padding(1);
    
        const extent = d3.extent(data, item => item.value);
        const yDomain = [Math.min(extent[0], 0), Math.max(extent[1], 0)];
        const rangePadding = this.height / 5;
    
        const yScale = d3.scaleLinear()
            .domain(yDomain)
            .range([this.height - rangePadding, rangePadding]);
    
        const points: ISplinePoint[] = data.map(({ label, value }, index) => ({
            hidden: !!(index % 2),
            label,
            value,
            x: xScale(label) as number,
            y0: this.height,
            y1: yScale(value) as number
        }));

        const firstPoint = points[0];
        const lastPoint = points[points.length - 1];

        points.unshift({
            hidden: true,
            label: '',
            value: 0,
            x: 0,
            y0: firstPoint.y0,
            y1: firstPoint.y1
        });

        points.push({
            hidden: true,
            label: '',
            value: 0,
            x: this.width,
            y0: lastPoint.y0,
            y1: lastPoint.y1
        });

        this.lineGroup.datum(points);
        this.markerGroup.datum(points);
        this.gridGroup.datum(points);
    }

    public async render(data: ISplineItem[], options) {
        this.bootstrap(options);
        this.calculate(data);

        return this.draw();
    }

}