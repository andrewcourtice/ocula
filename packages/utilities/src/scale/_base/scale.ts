import numberClamp from '../../number/clamp';

type Calculation<T> = (value: T) => number;

export interface IScale<T = number> {
    (value: T, clamp?: boolean): number,
    domain: T[],
    range: number[],
}

export default function scale<T = number>(domain: T[], range: number[], calculation: Calculation<T>): IScale<T> {
    const [
        min,
        max
    ] = range;

    const output: IScale<T> = (value: T, clamp: boolean) => {
        let result = calculation(value);

        if (clamp) {
            result = numberClamp(result, min, max);
        }

        return result;
    };

    output.domain = domain;
    output.range = range;
    
    return output;
}