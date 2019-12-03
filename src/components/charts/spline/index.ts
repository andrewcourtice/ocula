import Chart from '../_base/chart';

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

    protected bind<T>(data: T) {
        this.lineGroup.datum(data);
    }

    public async render<T>(data: T) {
        this.bootstrap();
        this.bind<T>(data);
    }

}