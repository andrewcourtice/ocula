import Vue from 'vue';

import {
    init
} from '@sentry/browser';

// import {
//     Vue as SentryVue
// } from '@sentry/integrations';

export default function initialiseLogging() {
    init({
        enabled: true,
        dsn: process.env.SENTRY_DSN,
        // integrations: [
        //     new SentryVue({
        //         Vue,
        //         attachProps: true 
        //     })
        // ]
    });
}