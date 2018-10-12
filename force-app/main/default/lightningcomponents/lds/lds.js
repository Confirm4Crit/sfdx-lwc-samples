import { Element, track } from 'engine';
import { getGitPath, restoreRecordId } from 'c-utils';

/**
 * The Lightning Data Service tab.
 */
export default class Lds extends Element {
    /** Record id to display in playground in LDS explorer. */
    @track recordId;

    /**
     * Lifecycle method. Restore the record id, if it exists, for improved cross-tab navigation.
     */
    connectedCallback() {
        this.recordId = restoreRecordId();
    }

    get codeStepOneA() {
        return [
            '/* Primitives from LWC framework */',
            "import { Element, api, wire } from 'engine';",
            '/* Object and field schema */',
            "import ACCOUNT_OBJECT from '@salesforce/schema/Account';",
            "import WEBSITE_FIELD from '@salesforce/schema/Account.Website';",
            "import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';",
            "import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';",
            "import OWNER_ID_FIELD from '@salesforce/schema/Account.OwnerId';",
            '',
            'export default class Playground extends Element {',
            '    /** Id of record to display. */',
            '    @api recordId;',
            '',
            '    /* Expose schema objects/fields to the template. */',
            '    accountObject = ACCOUNT_OBJECT;',
            '    websiteField = WEBSITE_FIELD;',
            '    industryField = INDUSTRY_FIELD;',
            '    annualRevenueField = ANNUAL_REVENUE_FIELD;',
            '    ownerIdField = OWNER_ID_FIELD;',
            '}',
        ].join('\n');
    }

    get codeStepOneB() {
        return ['<lightning-record-view-form record-id={recordId} object-api-name={accountObject}>'].join('\n');
    }

    get codeStepOneC() {
        return ['<lightning-output-field field-name={websiteField}></lightning-output-field>'].join('\n');
    }

    get codeStepTwoA() {
        return [
            '/* Wire adapter to fetch record data */',
            "import { getRecord } from 'lightning-ui-api-record';",
            "import NAME_FIELD from '@salesforce/schema/Account.Name';",
            '/* Util to get a field value from a record */',
            "import { getFieldValue  } from 'c-utils';",
        ].join('\n');
    }

    get codeStepTwoB() {
        return [
            '/* Load Account.Name for custom visualization */',
            "@wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD] })",
            'record;',
            '',
            '/** Gets the Account.Name value. */',
            'get nameValue() {',
            "    return this.record.data ? getFieldValue(this.record.data, NAME_FIELD).value : '';",
            '}',
        ].join('\n');
    }

    get codeStepThree() {
        return [
            '<template>',
            '    <div class="slds-card">',
            '        <lightning-record-view-form record-id={recordId} object-api-name={accountObject}>',
            '            <div class="slds-grid slds-wrap slds-p-around_small">',
            '                <div class="slds-col slds-size_1-of-1 slds-p-vertical_xx-small">',
            '                    <div class="slds-media">',
            '                        <div class="slds-media__figure">',
            '                            <lightning-avatar variant="circle" size="large" fallback-icon-name="standard:account" alternative-text={nameValue}></lightning-avatar>',
            '                        </div>',
            '                        <div class="slds-media__body">',
            '                            <lightning-formatted-text value={nameValue} class="slds-text-heading_large"></lightning-formatted-text>',
            '                        </div>',
            '                    </div>',
            '                </div>',
            '                <div class="slds-col slds-size_2-of-4 slds-p-vertical_xx-small">',
            '                    <lightning-output-field field-name={websiteField}></lightning-output-field>',
            '                    <lightning-output-field field-name={industryField}></lightning-output-field>',
            '                </div>',
            '                <div class="slds-col slds-size_2-of-4 slds-p-vertical_xx-small">',
            '                    <lightning-output-field field-name={annualRevenueField}></lightning-output-field>',
            '                    <lightning-output-field field-name={ownerIdField}></lightning-output-field>',
            '                </div>',
            '            </div>',
            '        </lightning-record-view-form>',
            '    </div>',
            '</template>',
        ].join('\n');
    }

    get gitLdsRecordUi() {
        return getGitPath('/lightningcomponents/lds_record_ui');
    }
}
