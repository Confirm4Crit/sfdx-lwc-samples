import { Element, track } from 'engine';
import { restoreRecordId } from 'c-utils';

/**
 * The navigation tab.
 */
export default class Navigation extends Element {
    @track recordId;

    /**
     * Lifecycle method. Restore the record id, if it exists, for improved cross-tab navigation.
     */
    connectedCallback() {
        this.recordId = restoreRecordId();
    }

    get codeStepOne() {
        return [
            '<lightning-button-icon',
            '    onclick={navigateToEdit}',
            '    icon-name="utility:edit"',
            '    variant="bare"',
            '    alternative-text="Edit"',
            '    class="slds-p-left_medium">',
            '</lightning-button-icon>',
        ].join('\n');
    }

    get codeStepTwoA() {
        return [
            '/* Mixin for navigation */',
            "import { NavigationMixin } from 'lightning-navigation';",
            '',
            '// Winter 19 mixin workaround',
            "import tmpl from './playground.html';",
            '',
            'export default class Playground extends NavigationMixin(Element) {',
        ].join('\n');
    }

    get codeStepTwoB() {
        return [
            '/**',
            ' * Navigates to the record edit page.',
            ' */',
            'navigateToEdit() {',
            '    this[NavigationMixin.Navigate]({',
            "        type: 'standard__recordPage',",
            '        attributes: {',
            '            recordId: this.recordId,',
            "            actionName: 'edit',",
            '        },',
            '    });',
            '}',
            '',
            '// Winter 19 mixin workaround',
            'render() {',
            '    return tmpl;',
            '}',
        ].join('\n');
    }
}
