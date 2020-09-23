import { ISettings } from '../../interfaces/storage';

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

} as Record<number, Migration>