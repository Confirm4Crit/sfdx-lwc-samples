/* Primitives from LWC framework */
import { Element, api, wire } from 'engine';
/* Mixin for navigation */
import { NavigationMixin } from 'lightning-navigation';
/* Wire adapter to fetch record data */
import { getRecord } from 'lightning-ui-api-record';
/* Static resource */
import SALESFORCE_LOGO_URL from '@salesforce/resource-url/salesforce_logo';
/* Util to get a field value from a record */
import { getFieldValue } from 'c-utils';
/* Object and field schema */
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import OWNER_ID_FIELD from '@salesforce/schema/Account.OwnerId';

// Winter 19 mixin workaround (W-5180125)
import tmpl from './playground_finished.html';

/**
 * Completed version of the playground component.
 */
export default class PlaygroundFinished extends NavigationMixin(Element) {
    /** Id of record to display. */
    @api recordId;

    /* Expose schema objects/fields to the template. */
    accountObject = ACCOUNT_OBJECT;
    websiteField = WEBSITE_FIELD;
    industryField = INDUSTRY_FIELD;
    annualRevenueField = ANNUAL_REVENUE_FIELD;
    ownerIdField = OWNER_ID_FIELD;

    /* Load Account.Name for custom visualization */
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD] })
    record;

    /** Gets the Account.Name value. */
    get nameValue() {
        return this.record.data ? getFieldValue(this.record.data, NAME_FIELD).value : '';
    }

    /**
     * Navigates to the record edit page.
     */
    navigateToEdit() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                actionName: 'edit',
            },
        });
    }

    /** Gets the URL for an imported static resource. */
    get logo() {
        return SALESFORCE_LOGO_URL;
    }

    // Winter 19 mixin workaround (W-5180125)
    render() {
        return tmpl;
    }
}
