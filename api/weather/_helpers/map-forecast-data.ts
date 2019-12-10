import FORECASTS from '../_constants/forecasts';
import TRANSFORMERS from '../_transformers/index';

export default function(forecasts, callback: Function = days => days[0]): any {
    return Object.values(FORECASTS).reduce((output, key) => {
        const value = forecasts[key];
        const transformer = TRANSFORMERS[key];

        if (!value || !value.days || value.days.length === 0) {
            return output;
        }

        const days = transformer(value.days);

        output[key] = callback(days);

        return output;
    }, {});
}