import LINE_TYPE from './enums/line-type';
import MARKER_TYPE from './enums/marker-type';

import SCALE from '../../enums/scale';
import CURVE from './constants/curve';

import Chart from '../_base/chart';

import * as d3 from '../../d3';

import {
    getScale
} from '../../scales';

import {
    valueGetAccessor
} from '@ocula/utilities';

import type {
    ILineOptions,
    ILinePoint
} from './types';

const lineGenerator = d3.line<ILinePoint>()
    .defined(data => !!data.y1)
    .x(data => data.x)
    .y(data => data.y1);

const areaGenerator = d3.area<ILinePoint>()
    .defined(data => !!data.y1)
    .x(data => data.x)
    .y0(data => data.y0)
    .y1(data => data.y1);

export default class LineChart extends Chart<ILineOptions> {

    private lineGroup: d3.Selection<SVGGElement, ILinePoint[], null, undefined>;
    private markerGroup: d3.Selection<SVGGElement, ILinePoint[], null, undefined>;
    private axisGroup: d3.Selection<SVGGElement, ILinePoint[], null, undefined>;
    private xAxis: d3.Selection<SVGGElement, ILinePoint[], null, undefined>;
    private yAxis: d3.Selection<SVGGElement, ILinePoint[], null, undefined>;

    constructor(element: Element) {
        super(element);

        this.axisGroup = this.canvas.append('g');
        this.lineGroup = this.canvas.append('g');
        this.markerGroup = this.canvas.append('g');

        this.xAxis = this.axisGroup.append('g');
        this.yAxis = this.axisGroup.append('g');
    }

    protected get defaultOptions(): ILineOptions {
        return {
            ...super.defaultOptions,

            type: LINE_TYPE.line,
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
            markers: {
                visible: true,
                type: MARKER_TYPE.point
            },
            labels: {
                visible: true,
                content: value => value.yValue
            },
            padding: {
                top: 32,
                bottom: 32,
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

    protected bootstrap(options: ILineOptions) {
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

    private async drawMarkers() {
        const {
            colours,
            labels,
            animation
        } = this.options;

        const getLabel = valueGetAccessor(labels.content);

        const updates = this.markerGroup.selectAll('g')
            .data(data => data, item => item.xValue);

        const entries = updates.enter()
            .append('g')
            .attr('transform', data => `translate(${data.x}, ${data.y1})`);

        updates.exit().remove();

        entries.append('text')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('fill', 'var(--font__colour)')
            .style('font-size', 'var(--font__size--small)');

        entries.append('circle')
            .attr('r', 3);

        const merges = updates.merge(entries);

        merges.select('circle')
            .attr('fill', colours.marker);

        merges.select('text')
            .text((data, index) => getLabel(data, index))
            .attr('dy', data => Math.sign(data.yValue) * -16);

        return updates.transition()
            .duration(animation.duration)
            .ease(d3.easePolyOut.exponent(4))
            .attr('transform', data => `translate(${data.x}, ${data.y1})`);
    }

    private async drawArea() {
        const {
            type,
            classes,
            colours,
            animation
        } = this.options;

        const curve = CURVE[type] || CURVE.line;

        let area = this.lineGroup.select(`.${classes.area}`);

        if (area.empty()) {
            area = this.lineGroup.append('path')
                .classed(classes.area, true)
                .attr('fill', colours.line)
                .attr('fill-opacity', 0.5)
                .attr('d', areaGenerator.curve(curve));
        }

        return area.transition()
            .duration(animation.duration)
            .ease(d3.easePolyOut.exponent(4))
            .attr('d', areaGenerator.curve(curve))
            .attr('fill', colours.line)
            .end();
    }

    private async drawLine() {
        const {
            type,
            classes,
            colours,
            animation
        } = this.options;

        const curve = CURVE[type] || CURVE.line;

        let line = this.lineGroup.select(`.${classes.line}`);

        if (line.empty()) {
            line = this.lineGroup.append('path')
                .classed(classes.line, true)
                .attr('stroke-width', 2)
                .attr('stroke', colours.line)
                .attr('fill', 'none')
                .attr('d', lineGenerator.curve(curve));
        }

        return line.transition()
            .duration(animation.duration)
            .ease(d3.easePolyOut.exponent(4))
            .attr('d', lineGenerator.curve(curve))
            .attr('stroke', colours.line)
            .end();
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
        return Promise.all([
            this.drawArea(),
            this.drawLine(),
            this.drawMarkers()
        ]);
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

        const points = data.map(value => {
            const xValue = xOptions.value(value);
            const yValue = yOptions.value(value);
    
            return {
                value,
                xValue,
                yValue,
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
        this.markerGroup.datum(points);
    }

    public async render<T>(data: T[], options: ILineOptions) {
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