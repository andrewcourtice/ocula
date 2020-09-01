import EVENTS from '../../../constants/core/events';

import {
    defineComponent, 
    ref,
    watch,
    onMounted,
    onBeforeUnmount,
    WatchStopHandle,
} from 'vue';

import {
    useSubscriber
} from '@ocula/components';

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

            useSubscriber(EVENTS.application.resized, render);

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