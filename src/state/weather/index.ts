import ACTIONS from './actions';
import MUTATIONS from './mutations';
import GETTERS from './getters';

import {
    getForecast
} from '../../services/weather';

export default {

    namespaced: true,

    state: {
        forecast: {}
    },

    getters: {

        [GETTERS.forecast](state) {
            const forecasts = state.forecast.forecasts;   

            if (!forecasts) {
                return;
            }

            const {
                weather,
                temperature,
                rainfall,
                wind
            } = forecasts;

            const length = weather.days.length;

            return Array.from({ length }, (item, index) => {
                const dayWeather = weather.days[index];
                const date = new Date(dayWeather.dateTime);

                return {
                    date,
                    weather: weather.days[index],
                    temperature: temperature.days[index],
                    rainfall: rainfall.days[index],
                    wind: wind.days[index]
                };
            });
        },

        [GETTERS.outlook](state, getters) {
            const forecast = getters.forecast;

            if (!forecast || forecast.length === 0) {
                return;
            }

            const today = forecast[0];

            return Object.keys(today).reduce((output, key) => {
                const {
                    entries
                } = today[key];

                if (entries && entries.length > 0) {
                    output[key] = entries[0];
                }

                return output;
            }, {});
        }

    },

    mutations: {

        [MUTATIONS.setForecast](state, payload: any) {
            state.forecast = payload;
        }

    },

    actions: {

        async [ACTIONS.loadForecast]({ commit }, payload) {
            const {
                locationId,
                days
            } = payload;

            const forecast = await getForecast(locationId, days);

            commit(MUTATIONS.setForecast, forecast);
        }

    }

}