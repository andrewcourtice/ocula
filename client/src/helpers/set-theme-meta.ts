import {
    domSetMeta
} from '@ocula/utilities';

export default function setThemeMeta(colour: string): void {
    domSetMeta('theme-color', colour);
}