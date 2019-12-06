import * as d3 from '../../d3/index';

export default abstract class Chart {

    protected element: Element;
    protected options: any;

    protected width: number;
    protected height: number;

    protected svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
    protected canvas: d3.Selection<SVGGElement, unknown, null, undefined>;

    constructor(element: Element) {
        this.element = element;

        this.width = 0;
        this.height = 0;
        
        this.svg = d3.select(this.element)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .style('display', 'block');

        this.canvas = this.svg.append('g');
    }

    protected get defaultOptions() {
        return {
            classes: {
                svg: 'chart',
                canvas: 'chart__canvas'
            },
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            }
        };
    }

    protected bootstrap(options) {
        this.options = {
            ...this.defaultOptions,
            ...options
        };

        const {
            width,
            height
        } = this.element.getBoundingClientRect();

        const {
            top,
            left,
            bottom,
            right
        } = this.options.padding;

        this.width = width - (left + right);
        this.height = height - (top + bottom);

        this.svg.classed(this.options.classes.svg, true)
            .attr('viewBox', `0 0 ${width} ${height}`);

        this.canvas.classed(this.options.classes.canvas, true)
            .attr('transform', `translate(${top}, ${left})`);
    }

}