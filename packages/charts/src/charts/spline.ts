import SCALE from '../constants/scale';

import Chart from './_base/chart';

import {
    getScale
} from '../scales/index';

import * as d3 from '../d3/index';

interface ISplinePoint {
    value: number,
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

export default class Spline extends Chart {

    private lineGroup: d3.Selection<SVGGElement, ISplinePoint[], null, undefined>;
    private markerGroup: d3.Selection<SVGGElement, ISplinePoint[], null, undefined>;
    private axisGroup: d3.Selection<SVGGElement, ISplinePoint[], null, undefined>;
    private xAxis: d3.Selection<SVGGElement, ISplinePoint[], null, undefined>;
    private yAxis: d3.Selection<SVGGElement, ISplinePoint[], null, undefined>;

    constructor(element: Element) {
        super(element);

        this.axisGroup = this.canvas.append('g');
        this.lineGroup = this.canvas.append('g');
        this.markerGroup = this.canvas.append('g');

        this.xAxis = this.axisGroup.append('g');
        this.yAxis = this.axisGroup.append('g');
    }

    protected get defaultOptions() {
        return {
            ...super.defaultOptions,

            scales: {
                x: {
                    type: SCALE.point,
                    value: item => item.x,
                    format: value => value
                },
                y: {
                    type: SCALE.linear,
                    value: item => item.y,
                    format: value => value
                }
            },
            padding: {
                top: 16,
                bottom: 16,
                left: 0,
                right: 0
            },
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
                axis: '#000000',
                tick: '#000000',
                label: '#000000'
            }
        };
    }

    protected bootstrap(options) {
        super.bootstrap(options);

        const {
            classes,
            padding
        } = this.options;

        this.lineGroup.classed(classes.lineGroup, true);
        this.markerGroup.classed(classes.markerGroup, true);

        this.xAxis.attr('transform', `translate(0, ${padding.top + this.height})`);
    }

    protected reset() {
        this.lineGroup.selectAll('*').remove();
        this.markerGroup.selectAll('*').remove();
    }

    private async enter() {
        const {
            classes,
            colours,
            animation
        } = this.options;

        const area = this.lineGroup.append('path')
            .classed(classes.area, true)
            .attr('fill', colours.line)
            .attr('fill-opacity', 0.5)
            .style('opacity', 0)
            .attr('d', areaGenerator);

        const line = this.lineGroup.append('path')
            .classed(classes.line, true)
            .attr('stroke-width', 2)
            .attr('stroke', colours.line)
            .attr('fill', 'none')
            .attr('d', lineGenerator);

        const lineLength = line.node().getTotalLength();

        line.attr('stroke-dasharray', lineLength)
            .attr('stroke-dashoffset', lineLength);
    
        await line.transition()
            .duration(animation.duration)
            .ease(d3.easePolyOut.exponent(4))
            .attr('stroke-dashoffset', 0)
            .end();

        line.attr('stroke-dasharray', null);

        return area.transition()
            .duration(animation.duration)
            .ease(d3.easePolyOut.exponent(4))
            .style('opacity', 1)
            .end();
    }

    private async update() {
        const {
            classes,
            colours,
            animation
        } = this.options;

        const line = this.lineGroup.select(`.${classes.line}`);
        const area = this.lineGroup.select(`.${classes.area}`);

        const areaTransition = area.transition()
            .duration(animation.duration)
            .ease(d3.easePolyOut.exponent(4))
            .attr('d', areaGenerator)
            .attr('fill', colours.line)
            .end();
            
        const lineTransition = line.transition()
            .duration(animation.duration)
            .ease(d3.easePolyOut.exponent(4))
            .attr('d', lineGenerator)
            .attr('stroke', colours.line)
            .end();

        return Promise.all([
            lineTransition,
            areaTransition
        ]);
    }

    private drawAxes() {
        const {
            colours
        } = this.options;
        
        const {
            xAxis,
            yAxis
        } = this.axisGroup.datum();
        
        function styleAxis(group, axis) {
            group.call(axis);

            if (colours.axis === false) {
                group.select('.domain').remove();
            }

            group.select('.domain')
                .attr('stroke', colours.axis);

            group.selectAll('.tick line')
                .attr('stroke', colours.tick);

            group.selectAll('.tick text')
                .attr('fill', colours.label);
        }

        styleAxis(this.xAxis, xAxis);
        styleAxis(this.yAxis, yAxis);

        const yScale = yAxis.scale();
        const yMin = yScale.domain()[0];
        const translation = yScale(yMin);

        this.xAxis.attr('transform', `translate(0, ${translation})`);
    }

    private async draw() {
        this.drawAxes();

        const path = this.lineGroup.select('path');
        const action = path.empty() ? this.enter : this.update;

        return action.call(this);
    }

    private getAxis(axisType, scale, options) {
        const {
            ticks,
            format,
            size
        } = options;

        const axis = axisType(scale)
            .tickFormat(format);

        if (ticks && typeof ticks === 'number') {
            axis.ticks(ticks);
        }

        if (ticks && typeof ticks === 'function') {
            axis.tickValues(ticks(scale.domain()));
        }

        if (size > 0) {
            axis.tickSize(size);
        }

        return axis;
    }
    
    private calculate<T>(data: T[]) {
        const {
            x: xOptions,
            y: yOptions
        } = this.options.scales;
    
        const xScale = getScale(data, xOptions, [0, this.width]);
        const yScale = getScale(data, yOptions, [this.height - 2, 2]);

        const xAxis = this.getAxis(d3.axisBottom, xScale, xOptions);
        const yAxis = this.getAxis(d3.axisRight, yScale, yOptions);

        const points = data.map(item => {
            const xValue = xOptions.value(item);
            const yValue = yOptions.value(item);
    
            return {
                x: xScale(xValue),
                y0: yScale(0),
                y1: yScale(yValue)
            };
        });

        this.axisGroup.datum({
            xAxis,
            yAxis
        });
        
        this.lineGroup.datum(points);
    }

    public async render<T>(data: T[], options) {
        if (this.rendering) {
            this.reset();
        }
        
        this.rendering = true;

        this.bootstrap(options);
        this.calculate<T>(data);

        try {
            await this.draw();
        } finally {
            this.rendering = false;
        }
    }

}