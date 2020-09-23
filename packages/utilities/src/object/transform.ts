import functionIdentity from '../function/identity';
import typeIsArray from '../type/is-array';
import typeIsFunction from '../type/is-function';
import typeIsNil from '../type/is-nil';
import typeIsPlainObject from '../type/is-plain-object';

type Transformer = <T>(value: any, key?: PropertyKey, input?: T) => any;
type SchemaValue = any | any[] | Transformer | Object;

interface Schema {
    [key: string]: Transformer | Schema | Schema[]
}

function getTransformer(schemaValue: SchemaValue, baseTransformer: Transformer): Transformer {
    switch (true) {
        case typeIsFunction(schemaValue):
            return schemaValue;
        case typeIsArray(schemaValue):
            return value => transformArray(value, schemaValue, baseTransformer);
        case typeIsPlainObject(schemaValue):
            return value => transformObject(value, schemaValue, baseTransformer);
        default:
            return baseTransformer;
    }
}

function transformArray(input: any[], schemaValue: any[], baseTransformer: Transformer): any[] {
    const transformer = getTransformer(schemaValue[0], baseTransformer);

    return input.map(transformer);
}

function transformObject<T, U = any>(input: T, schema: Schema, baseTransformer: Transformer): U {
    const output: U = {};

    for (const key in input) {
        const schemaValue = schema[key];
        const transformer = getTransformer(schemaValue, baseTransformer);
        const value = transformer(input[key], key, input);

        if (!typeIsNil(value)) {
            output[key] = value;
        }
    }

    return output;
}

export default function transform<T, U = any>(input: T, schema: Schema, baseTransformer: Transformer = functionIdentity): U {
    return transformObject(input, schema, baseTransformer);
}