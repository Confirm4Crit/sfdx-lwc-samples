import { Element, track, wire } from 'engine';
import { getGitPath } from 'c-utils';
import { getPicklistValues } from 'lightning-ui-api-object-info';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

/**
 * Sample demonstrating lightning-combobox.
 */
export default class GalleryCombobox extends Element {
    /** Combobox selection state */
    @track status;

    @wire(getPicklistValues, { fieldApiName: INDUSTRY_FIELD, recordTypeId: '012000000000000AAA' })
    industryFieldPicklistValues;

    /** Data for combobox */
    get comboboxOptions() {
        if (!this.industryFieldPicklistValues || !this.industryFieldPicklistValues.data) {
            return [];
        }
        return this.industryFieldPicklistValues.data.values;
    }

    /**
     * Handler for combobox value change.
     * @param {Event} evt change event
     */
    handleComboboxChange(evt) {
        this.status = 'Selected: ' + evt.detail.value;
    }

    get gitSource() {
        return getGitPath('/lightningcomponents/gallery_combobox');
    }
}
