export interface ITheme {
    id: string;
    name: string;
    colour: string | Record<string, string>;
    class: string | string[];
    mapStyle: string | Record<string, string>;
}