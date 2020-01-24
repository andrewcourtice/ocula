import Chart from './_base/chart';

import * as d3 from '../d3/index';

interface ISparklinePoint {
    value: number,
    x: number,
    y0: number,
    y1: number
};

const lineGenerator = d3.line<ISparklinePoint>()
    .defined(data => !!data.y1)
    .x(data => data.x)
    .y(data => data.y1)
    .curve(d3.curveCatmullRom.alpha(1));

const areaGenerator = d3.area<ISparklinePoint>()
    .defined(data => !!data.y1)
    .x(data => data.x)
    .y0(data => data.y0)
    .y1(data => data.y1)
    .curve(d3.curveCatmullRom.alpha(1));

export default class Sparkline extends Chart {

    protected get defaultOptions() {
        return {
            ...super.defaultOptions,
            
            padding: {
                top: 10,
                bottom: 10,
                left: 0,
                right: 0
            },
            classes: {
                svg: 'sparkline-chart__svg',
                canvas: 'sparkline-chart__canvas',
                line: 'sparkline-chart__line',
                area: 'sparkline-chart__area',
                marker: 'sparkline-chart__marker'
            },
            colours: {
                line: '#000000',
                marker: '#000000'
            }
        };
    }

    private async enter() {
        const {
            classes,
            colours
        } = this.options;

        const timing = 1000;

        const area = this.canvas.append('path')
            .classed(classes.area, true)
            .attr('fill', colours.line)
            .attr('fill-opacity', 0.5)
            .style('opacity', 0)
            .attr('d', areaGenerator);

        const line = this.canvas.append('path')
            .classed(classes.line, true)
            .attr('stroke-width', 2)
            .attr('stroke', colours.line)
            .attr('fill', 'none')
            .attr('d', lineGenerator);

        const lineLength = line.node().getTotalLength();

        line.attr('stroke-dasharray', lineLength)
            .attr('stroke-dashoffset', lineLength);
    
        await line.transition()
            .duration(timing)
            .ease(d3.easePolyOut.exponent(4))
            .attr('stroke-dashoffset', 0)
            .end();

        line.attr('stroke-dasharray', null);

        return area.transition()
            .duration(timing)
            .ease(d3.easePolyOut.exponent(4))
            .style('opacity', 1)
            .end();
    }

    private async update() {
        const {
            classes
        } = this.options;

        const timing = 1000;

        const line = this.canvas.select(`.${classes.line}`);
        const area = this.canvas.select(`.${classes.area}`);

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

        return Promise.all([
            lineTransition,
            areaTransition
        ]);
    }

    private async draw() {
        const path = this.canvas.select('path');
        const action = path.empty() ? this.enter : this.update;
    
        return action.call(this);
    }
    
    private calculate<T>(data: T[]) {
        const {
            xSelector,
            ySelector
        } = this.options;

        const xDomain = data.map(xSelector);
    
        const xScale = d3.scalePoint()
            .domain(xDomain)
            .range([0, this.width]);
    
        const extent = d3.extent(data, ySelector);
        const yDomain = [Math.min(extent[0], 0), Math.max(extent[1], 0)];
    
        const yScale = d3.scaleLinear()
            .domain(yDomain)
            .range([this.height - 2, 2]);
    
        const points = data.map(item => {
            const xValue = xSelector(item);
            const yValue = ySelector(item);
    
            return {
                x: xScale(xValue),
                y0: yScale(0),
                y1: yScale(yValue)
            };
        });

        this.canvas.datum(points);
    }

    public async render<T>(data: T[], options) {
        this.bootstrap(options);
        this.calculate<T>(data);

        return this.draw();
    }

}