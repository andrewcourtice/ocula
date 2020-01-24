import EVENTS from '../../../../constants/events';

import subscriberMixin from '../../../core/mixins/subscriber';

export default function chart(Chart) {
    return {

        mixins: [
            subscriberMixin(EVENTS.application.resized, 'render')
        ],

        props: {

            data: {
                type: Array,
                default: () => []
            },

            options: {
                type: Object
            },

            autoRender: {
                type: Boolean,
                default: true
            },

            autoUpdate: {
                type: Boolean,
                default: true
            }

        },

        data() {
            return {
                chart: null,
                updateWatch: null
            };
        },
    
        methods: {
    
            async render() {
                if (!this.chart) {
                    return;
                }
                console.log('rendered');
                return this.chart.render(this.data, this.options);
            }
    
        },
        
        mounted() {
            const chart = new Chart(this.$el);
    
            this.chart = chart;
    
            if (this.autoRender) {
                this.render();
            }

            if (this.autoUpdate) {
                this.updateWatch = this.$watch('data', this.render);
            }
        },

        beforeDestroy() {
            this.updateWatch && this.updateWatch();
        }

    };
}