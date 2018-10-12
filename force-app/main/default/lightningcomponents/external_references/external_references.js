import { Element, track } from 'engine';
import { getGitPath, restoreRecordId } from 'c-utils';

/**
 * The external references tab.
 */
export default class ExternalReferences extends Element {
    @track recordId;

    /**
     * Lifecycle method. Restore the record id, if it exists, for improved cross-tab navigation.
     */
    connectedCallback() {
        this.recordId = restoreRecordId();
    }

    get codeStepOne() {
        return ['logo.resource', 'logo.resource-meta.xml'].join('\n');
    }

    get codeStepTwoA() {
        return ["import LOGO_URL from '@salesforce/resource-url/logo';"].join('\n');
    }

    get codeStepTwoB() {
        return ['get logo() {', '   return LOGO_URL;', '}'].join('\n');
    }

    get codeStepThree() {
        return [
            '<lightning-avatar variant="circle" src={logo} size="large" fallback-icon-name="standard:account" alternative-text={nameValue}></lightning-avatar>',
        ].join('\n');
    }

    get gitSource() {
        return getGitPath('/staticresources');
    }

    get gitSalesforceLogo() {
        return getGitPath('/staticresources/salesforce_logo.resource');
    }

    get gitSalesforceLogoMetaXml() {
        return getGitPath('/staticresources/salesforce_logo.resource-meta.xml');
    }
}
