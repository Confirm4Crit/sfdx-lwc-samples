import { Element, track } from 'engine';
import { restoreRecordId } from 'c-utils';

/**
 * The lightning pages tab.
 */
export default class Flexipage extends Element {
    @track recordId;

    /**
     * Lifecycle method. Restore the record id, if it exists, for improved cross-tab navigation.
     */
    connectedCallback() {
        this.recordId = restoreRecordId();
    }

    get codeStepZero() {
        return [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">',
            '    <apiVersion>44.0</apiVersion>',
            '    <isExposed>false</isExposed>',
            '</LightningComponentBundle>',
        ].join('\n');
    }

    get codeStepOne() {
        return [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">',
            '    <apiVersion>44.0</apiVersion>',
            '    <isExposed>false</isExposed>',
            '    <tags>',
            '        <tag>lightning__RecordHome</tag>',
            '        <tag>lightning__HasRecordId</tag>',
            '    </tags>',
            '</LightningComponentBundle>',
        ].join('\n');
    }
}
