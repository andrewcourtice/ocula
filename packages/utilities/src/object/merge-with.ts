import mergeWith from 'lodash/mergeWith';

export default function(...args) {
    return mergeWith({}, ...args);
}