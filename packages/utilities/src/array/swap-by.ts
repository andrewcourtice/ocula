import isNumber from '../type/is-number';
import clamp from '../number/clamp';


type Predicate<T> = (value: T) => boolean;

function getIndex<T>(array: T[], predicate: number | Predicate<T>): number {
    const index = isNumber(predicate) ? predicate : array.findIndex(predicate);

    return clamp(index, 0, array.length - 1);
}

export default function swapBy<T>(array: T[], predicateA: number | Predicate<T>, predicateB: number | Predicate<T>): T[] {
    const clone = array.slice();

    const indexA = getIndex(array, predicateA);
    const indexB = getIndex(array, predicateB);

    clone[indexA] = array[indexB];
    clone[indexB] = array[indexA];

    return clone;
}