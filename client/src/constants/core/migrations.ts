import SETTINGS from '../core/settings';

import {
    arrayUnionWith,
    objectTransform
} from '@ocula/utilities';

import type {
    ISettings
} from '../../interfaces/storage';

type Migration = (settings: ISettings) => ISettings;

/*
Dictionary to migrate settings structures to new versions.
For example, removing a section using the object transformer:
{
    3: settings => objectTransform(settings, {
        forecast: {
            sections: sections => sections.filter(({ type }) => type !== 'today')
        }
    })
}
*/

export default {
    '1': settings => objectTransform(settings, {
        forecast: {
            sections: sections => arrayUnionWith(sections, SETTINGS.forecast.sections, (a, b) => a.type === b.type)
        }
    })
} as Record<number, Migration>