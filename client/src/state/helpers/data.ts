export function formatDataPoint(dataPoint, unitFormats) {
    const formatted = Object.keys(dataPoint).reduce((output, key) => {
        let value = dataPoint[key];
        const format = unitFormats[key];

        if (format) {
            value = typeof format === 'string' ? `${value} ${format}` : format(value) || value; 
        }

        output[key] = value;

        return output;
    }, {});

    return {
        formatted,
        raw: dataPoint
    };
}