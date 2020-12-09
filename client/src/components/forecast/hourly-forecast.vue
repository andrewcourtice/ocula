<template>
    <div class="forecast-hourly">
        <div class="forecast-hourly__header" layout="row center-justify">
            <div self="size-x1">{{ trend.label }} ({{ trend.unitOfMeasure }})</div>
            <div class="forecast-hourly__options" layout="row center-center">
                <icon-button class="menu-item text--small"
                    v-for="trend in trends"
                    v-tooltip="trend.label"
                    layout="vertical"
                    :key="trend.key"
                    :icon="trend.icon"
                    :class="getOptionClass(trend.key)"
                    @click="setTrend(trend.key)">
                </icon-button>
            </div>
        </div>
        <trends :data="hours" :options="trend.chartOptions" :key-by="hour => hour.dt.raw" :secondary-rows="2">
            <template #primary-column="column">
                <small>{{ getTime(column.value) }}</small>
            </template>
            <template #secondary-column="column">
                <template v-if="type === 'wind'">
                    <icon name="arrow-up-line" :style="getWindIconStyle(column.value)" v-if="column.row === 1"/>
                    <small class="text--x-small" v-else>{{ column.value.windDeg.formatted }}</small>
                </template>
                <template v-else>
                    <icon :name="getIcon(column.value.weather.id.raw, column.value.dt.raw)" v-if="column.row === 1"/>
                    <small class="text--x-small" v-else>{{ column.value.weather.description.formatted }}</small>
                </template>
            </template>
        </trends>
    </div>
</template>

<script lang="ts">
import TREND from '../../enums/forecast/trend';
import TRENDS from '../../constants/forecast/trends';

import Trends from '../charts/trends.vue';

import getIcon from '../../helpers/get-icon';

import {
    defineComponent,
    ref,
    computed
} from 'vue';

import {
    forecast,
    format,
    unitOfMeasure
} from '../../store';

import type {
    Formatted,
    IMappedForecastHour
} from '../../types/state';

export default defineComponent({
    
    components: {
        Trends
    },

    setup(props) {
        const type = ref(TREND.temperature);

        const trends = Object.keys(TRENDS).map(key => {
            const {
                icon,
                label
            } = TRENDS[key];

            return {
                key,
                icon,
                label
            };
        })

        const hours = computed(() => forecast.value.hourly);

        const trend = computed(() => {
            const trend = TRENDS[type.value];
            const uom = unitOfMeasure.value[trend.observation];

            return {
                ...trend,
                unitOfMeasure: uom
            };
        });

        function getTime(hour: Formatted<IMappedForecastHour>): string {
            return format.value.time(hour.dt.formatted as any, 'h a');
        }

        function getWindIconStyle(hour: Formatted<IMappedForecastHour>) {
            return {
                transformOrigin: 'center',
                transform: `rotate(${hour.windDeg.raw}deg)`
            };
        }

        function getOptionClass(key: TREND): string {
            return key === type.value && 'menu-item--active';
        }

        function setTrend(value: TREND): void {
            type.value = value;
        }

        return {
            type,
            hours,
            trends,
            trend,
            getTime,
            getIcon,
            getWindIconStyle,
            getOptionClass,
            setTrend
        };
    }

});
</script>

<style lang="scss">
    @import "~@ocula/style/src/_mixins.scss";

    .forecast-hourly__header {
        padding: 0 var(--spacing__medium) 0 var(--spacing__large) ;
    }

    .forecast-hourly__options {
        width: auto;
    }

</style>