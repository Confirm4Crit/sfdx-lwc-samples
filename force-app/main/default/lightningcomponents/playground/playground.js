/* Primitives from LWC framework */
import { Element, api, wire } from 'engine';
import { restoreRecordId } from 'c-utils';
/* Object and field schema */
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import OWNER_ID_FIELD from '@salesforce/schema/Account.OwnerId';


export default class Playground extends Element {
    /** Id of record to display. */
    @api recordId;

    /**
     * Lifecycle method. Restore the record id, if it exists, for improved cross-tab navigation.
     */
    connectedCallback() {
        this.recordId = restoreRecordId();
    }

    /* Expose schema objects/fields to the template. */
    accountObject = ACCOUNT_OBJECT;
    websiteField = WEBSITE_FIELD;
    industryField = INDUSTRY_FIELD;
    annualRevenueField = ANNUAL_REVENUE_FIELD;
    ownerIdField = OWNER_ID_FIELD;
}