import EVENTS from '../../../constants/events';

import {
    defineComponent, 
    ref,
    watch,
    onMounted,
    onBeforeUnmount,
    WatchStopHandle,
} from 'vue';

export default function chart(Chart) {
    return defineComponent({

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

        setup(props) {
            let chart;
            let watchHandle: WatchStopHandle;

            const element = ref<Element>(null);

            async function render() {
                if (!chart) {
                    return;
                }
    
                return chart.render(props.data, props.options);
            }

            onMounted(() => {
                chart = new Chart(element.value);
            
                if (props.autoRender) {
                    render();
                }
    
                if (props.autoUpdate) {
                    watchHandle = watch([
                        () => props.data,
                        () => props.options
                    ], render);
                }
            });

            onBeforeUnmount(() => watchHandle && watchHandle());

            return {
                element
            };
        }

    });
}