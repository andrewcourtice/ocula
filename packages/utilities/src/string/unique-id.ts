import { nanoid } from 'nanoid';

export default function uniqueId(length: number = 6): string {
    return nanoid(length);
}