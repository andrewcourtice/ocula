export default function chart(Chart, dataProperty: string = 'data', optionsProperty: string = 'options') {
    return {

        props: {

            autoRender: {
                type: Boolean,
                default: true
            }

        },

        data() {
            return {
                chart: null
            };
        },
    
        methods: {
    
            async render() {
                if (!this.chart) {
                    return;
                }
    
                return this.chart.render(this[dataProperty], this[optionsProperty]);
            }
    
        },
        
        mounted() {
            const chart = new Chart(this.$el);
    
            this.chart = chart;
    
            if (this.autoRender) {
                this.render();
            }
        }
    };
}