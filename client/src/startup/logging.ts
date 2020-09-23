import {
    envIsProduction
} from '@ocula/utilities';

import {
    init
} from '@sentry/browser';


// import {
//     Vue as SentryVue
// } from '@sentry/integrations';

export default function initialiseLogging() {
    init({
        enabled: envIsProduction,
        dsn: process.env.SENTRY_DSN,
        // integrations: [
        //     new SentryVue({
        //         Vue,
        //         attachProps: true 
        //     })
        // ]
    });
}