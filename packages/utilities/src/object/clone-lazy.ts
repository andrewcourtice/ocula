export default function cloneLazy<T extends Object>(value: T): T {
    return JSON.parse(JSON.stringify(value));
}