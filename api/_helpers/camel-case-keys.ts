import toCamelCase from './to-camel-case';

export default function camelCaseKeys(data: Record<string, any>): Record<string, any> {
    const output = {};

    for (const key in data) {
        let value = data[key];
        const camelKey = toCamelCase(key);

        switch (true) {
            case Array.isArray(value):
                value = value.map(camelCaseKeys);
                break;
            case typeof value === 'object':
                value = camelCaseKeys(value);
                break;
        }

        output[camelKey] = value;
    }

    return output;
}