import merge from 'lodash/merge';

// Convert merge to be immutable
export default function(...sources) {
    return merge({}, ...sources); 
};