import * as d3 from '../../../packages/d3/index';

export default abstract class Chart {

    protected element: Element;
    protected options: any;

    protected width: number;
    protected height: number;

    protected svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
    protected canvas: d3.Selection<SVGGElement, unknown, null, undefined>;

    constructor(element: Element, options) {
        this.element = element;

        this.width = 0;
        this.height = 0;
        
        this.options = {
            ...this.defaultOptions,
            ...options
        };

        this.svg = d3.select(this.element)
            .append('svg')
            .attr('class', this.options.class)
            .attr('width', '100%')
            .attr('height', '100%');

        this.canvas = this.svg.append('g')
            .classed(this.getClass('canvas'), true);
    }

    protected get defaultOptions() {
        return {
            class: 'chart',
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            }
        }
    }

    protected getClass(suffix) {
        return `${this.options.class}__${suffix}`;
    }

    protected bootstrap() {
        const {
            width,
            height
        } = this.element.getBoundingClientRect();

        const {
            top,
            left,
            bottom,
            right
        } = this.options;

        this.width = width - (left + right);
        this.height = height - (top + bottom);

        this.svg.attr('viewBox', `0 0 ${width} ${height}`);
        this.canvas.attr('transform', `translate(${top}px, ${left}px)`);
    }

}