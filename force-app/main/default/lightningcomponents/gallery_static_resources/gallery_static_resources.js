import { Element } from 'engine';
import { getGitPath } from 'c-utils';

// Import the URL for an image and zip stored as static resources
import salesforceLogo from '@salesforce/resource-url/salesforce_logo';
import avatarArchive from '@salesforce/resource-url/avatar_archive';

// Import custom labels
import salesforceLogoDescription from '@salesforce/label/c.salesforce_logo_description';
import avatarDescription from '@salesforce/label/c.avatar_description';

/**
 * Sample demonstrating referencing static resources and custom labels.
 */
export default class GalleryStaticResources extends Element {
    // expose the static resource URL for use in the template
    salesforceLogoUrl = salesforceLogo;
    // concatenate the path for an item in an archive
    avatarUrl = avatarArchive + '/assets/images/avatar1.png';

    // expose the labels for use in the template
    label = {
        salesforceLogoDescription,
        avatarDescription,
    };

    get gitSource() {
        return getGitPath('/lightningcomponents/gallery_static_resources');
    }
}
