export default function(value: string): string {
    return value.toLowerCase().replace(/([-_]\w)/g, group => group[1].toUpperCase());
}