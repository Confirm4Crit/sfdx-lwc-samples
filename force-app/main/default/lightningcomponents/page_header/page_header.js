import { Element, api } from 'engine';
import { classSet, normalizeBoolean } from 'c-utils';

/**
 * A page header component.
 */
export default class PageHeader extends Element {
    /** Page header. */
    @api header;

    /** Description of page */
    @api description;

    /** (Boolean) Should the header be joined to content */
    @api joined = false;

    get computedClasses() {
        return classSet('slds-page-header')
            .add({ 'slds-page-header_joined': normalizeBoolean(this.joined) })
            .toString();
    }
}
