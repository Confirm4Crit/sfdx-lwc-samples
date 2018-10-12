import { Element, track } from 'engine';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

/**
 * Component that creates Account records.
 */
export default class AccountCreator extends Element {
    /** Status message when creating an Account. */
    @track createStatus = '';

    accountObject = ACCOUNT_OBJECT;
    nameField = NAME_FIELD;
    websiteField = WEBSITE_FIELD;
    annualRevenueField = ANNUAL_REVENUE_FIELD;
    industryField = INDUSTRY_FIELD;

    /** Handler for successful Account creation. */
    handleAccountCreated(evt) {
        this.createStatus = `Account record created. Id is ${evt.detail.id}.`;

        const event = new CustomEvent('newrecord', {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: { data: evt.detail },
        });
        this.dispatchEvent(event);
    }
}
