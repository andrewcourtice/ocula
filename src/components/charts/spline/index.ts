import Chart from '../_base/chart';

import * as d3 from '../../../packages/d3/index';

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

export class SplineChart<T> extends Chart {

    private gradient: d3.Selection<SVGLinearGradientElement, unknown, null, undefined>;
    private lineGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
    private markerGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

    constructor(element: Element, options) {
        super(element, options);

        const {
            colours
        } = this.options;

        this.lineGroup = this.canvas.append('g')
            .classed(this.getClass('line-group'), true);

        this.markerGroup = this.canvas.append('g')
            .classed(this.getClass('marker-group'), true);

        this.gradient = this.svg.append('defs')
            .append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%');

        this.gradient.append('stop')
            .attr('offset', '0%')
            .style('stop-color', colours.gradient.stop1)
            .style('stop-opacity', 1);

        this.gradient.append('stop')
            .attr('offset', '35%')
            .style('stop-color', colours.gradient.stop2)
            .style('stop-opacity', 1);

        this.gradient.append('stop')
            .attr('offset', '90%')
            .style('stop-color', colours.gradient.stop3)
            .style('stop-opacity', 1);
    }

    protected get defaultOptions() {
        return {
            ...super.defaultOptions,

            class: 'spline-chart',
            colours: {
                line: '#000',
                gradient: {
                    stop1: '#FFFFFF',
                    stop2: '#FFFFFF',
                    stop3: '#FFFFFF',
                }
            }
        };
    }

    protected bootstrap() {
        super.bootstrap();


    }

    protected bind(data: ISplineItem[]) {
        this.lineGroup.datum(data);
    }

    private calculatePoints(data: ISplineItem[]): ISplinePoint[] {
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
    
        return data.map(({ label, value }) => ({
            label,
            value,
            x: xScale(label) as number,
            y0: this.height,
            y1: yScale(value) as number
        }));
    }

    public async render(data: ISplineItem[]) {
        this.bootstrap();
        this.bind(data);
    }

}