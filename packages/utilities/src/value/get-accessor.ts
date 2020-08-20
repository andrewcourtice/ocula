import isNil from '../type/is-nil';
import isFunction from '../type/is-function';
import noop from '../function/noop';

type Product<T> = (...args: any[]) => T;

export default function getAccessor<T>(identity: T | Product<T>): Product<T> {
    if (isNil(identity)) {
        return noop as any;
    }

    return isFunction(identity) ? identity : () => identity;
}