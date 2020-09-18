import functionIdentity from '../function/identity';
import typeIsArray from '../type/is-array';
import typeIsFunction from '../type/is-function';
import typeIsNil from '../type/is-nil';
import typeIsPlainObject from '../type/is-plain-object';

type Transformer = <T>(value: any, key?: string, input?: T) => any;

interface Schema {
    [key: string]: Transformer | Schema | Schema[]
}

export default function transform<T, U = any>(input: T, schema: Schema, baseTransformer: Transformer = functionIdentity): U {

    const output: U = {};

    for (const key in input) {
        const schemaValue = schema[key];
        let value = input[key];

        switch (true) {
            case typeIsFunction(schemaValue):
                value = (schemaValue as Transformer)(value, key, input);
                break;
            case typeIsArray(schemaValue):
                value = value.map(item => transform(item, schemaValue[0], baseTransformer));
                break;
            case typeIsPlainObject(schemaValue):
                value = transform(value, schemaValue as Schema, baseTransformer);
                break;
            default:
                value = baseTransformer(value, key, input)
        }

        if (!typeIsNil(value)) {
            output[key] = value;
        }
    }

    return output;
}