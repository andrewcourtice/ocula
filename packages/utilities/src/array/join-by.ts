import getAccessor from '../value/get-accessor';

type Iteratee<T> = (value: T) => string;

export default function joinBy<T>(array: T[], iteratee: Iteratee<T> = value => String(value), separator: string = ','): string {
    const accessor = getAccessor(iteratee);
    const trimmer = new RegExp(`${separator}$`);

    return array.reduce((output, value) => output + accessor(value) + separator, '')
        .replace(trimmer, '');
}