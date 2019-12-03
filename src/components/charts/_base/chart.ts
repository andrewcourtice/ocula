import * as d3 from '../../../packages/d3/index';

export default abstract class Chart {

    private element: Element;
    private options: any;

    private svg: any;

    constructor(element: Element, options) {
        this.element = element;
        
        this.options = {
            ...this.defaultOptions,
            ...options
        };
    }

    protected get defaultOptions() {
        return {
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            }
        }
    }

    protected bootstrap() {
        const rect = this.element.getBoundingClientRect();
        
        this.svg = d3.select(this.element)
            .append('svg')
            .attr('class', 'chart')
            .attr('width', '100%')
            .attr('height', '100%');

        this.canvas = this.svg.append('g')
            .classed(CLASSES.canvas, true);

        this.lineGroup = this.canvas.append('g')
            .classed(CLASSES.lineGroup, true);

        this.markerGroup = this.canvas.append('g')
            .classed(CLASSES.markerGroup, true);
    }

}