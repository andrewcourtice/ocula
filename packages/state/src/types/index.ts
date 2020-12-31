import type {
    ComputedRef
} from '@vue/reactivity';

export type Getter<T, U> = (state: T) => U;
export type Mutation<T> = (state: T) => void;

export interface IStore<T> {
    state: T;
    getter<U>(getter: Getter<T, U>): ComputedRef<U>;
    mutate(name:string, mutation: Mutation<T>): void;
    destroy(): void;
};