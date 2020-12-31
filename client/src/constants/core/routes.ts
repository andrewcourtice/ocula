export default {
    forecast: {
        index: 'forecast:index',
    },
    maps: {
        index: 'maps:index'
    },
    settings: {
        index: 'settings:index',
        forecast: {
            locations: 'settings:forecast:locations',
            sections: 'settings:forecast:sections',
        },
        maps: {
            display: 'settings:maps:display'
        },
        general: {
            theme: 'settings:general:theme',
            about: 'settings:general:about'
        }
    },
    error: {
        index: 'error:index',
        notFound: 'error:not:found'
    }
} as const;