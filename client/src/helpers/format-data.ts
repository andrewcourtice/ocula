export function formatBlock(data: object, format: object) {
    const output = {};

    for (const key in data) {
        const value = data[key];
        const formatter = format[key];

        output[key] = value;

        if (!formatter) {
            continue;
        }

        output[key] = typeof formatter === 'string'
            ? `${value} ${formatter}`
            : formatter(value) || value;
    }

    return output;
}

export default function formatData(data: object, format: object) {
    const formatted = formatBlock(data, format);

    return {
        formatted,
        raw: data
    };
}