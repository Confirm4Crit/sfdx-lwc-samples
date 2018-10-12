import { Element, track } from 'engine';
import { getGitPath, restoreRecordId } from 'c-utils';

import LTS_JEST_INITIAL_URL from '@salesforce/resource-url/lts_jest_initial';

/**
 * The testing tab.
 */
export default class Testing extends Element {
    @track recordId;

    /**
     * Lifecycle method. Restore the record id, if it exists, for improved cross-tab navigation.
     */
    connectedCallback() {
        this.recordId = restoreRecordId();
    }

    get codeStepOne() {
        return ['npm install'].join('\n');
    }

    get codeStepTwo() {
        return ['npm run test:unit:watch'].join('\n');
    }

    get ltsJestInitialUrl() {
        return LTS_JEST_INITIAL_URL;
    }

    get codeStepThree() {
        return [
            '/* Primitives from LWC framework */',
            "import { createElement } from 'engine';",
            '/* Component to test */',
            "import Playground from 'c-playground';",
            '',
            '/*',
            ' * Mock out lightning-navigation mixin. For unit testing purposes we want to',
            ' * verify that NavigationMixin.Navigate() is invoked with the correct payload.',
            ' */',
            'jest.mock(',
            "    'lightning-navigation',",
            '    () => {',
            '        const Navigate = jest.fn();',
            '        const NavigationMixin = Base => {',
            '            return class extends Base {',
            '                [Navigate] = Navigate;',
            '            };',
            '        };',
            '        NavigationMixin.Navigate = Navigate;',
            '        return { NavigationMixin };',
            '    },',
            '    { virtual: true },',
            ');',
            '',
            '',
            "describe('c-playground', () => {",
            '    afterEach(() => {',
            '        // the jsdom instance is shared across test cases in a single file so remove all',
            '        // test artifacts from the DOM prior to running each test',
            '        while (document.body.firstChild) {',
            '            document.body.removeChild(document.body.firstChild);',
            '        }',
            '',
            '        // prevent data saved on mocks from leaking between tests',
            '        jest.clearAllMocks();',
            '    });',
            '',
            "    it('sets lightning-avatar source', () => {",
            '        // create the component under test',
            "        const element = createElement('c-playground', { is: Playground });",
            '        // set the properties',
            "        element.recordId = '001000000000000001';",
            '        // attach the component to the DOM',
            '        document.body.appendChild(element);',
            '',
            '        // select the avatar element',
            "        const avatar = element.querySelector('lightning-avatar');",
            '        // verify the src property. if you used a different static resource filename you',
            '        // must update the value',
            "        expect(avatar.src).toBe('logo');",
            '    });',
            '});',
        ].join('\n');
    }

    get codeStepFourA() {
        return [
            "const mockGetRecord = require('./data/record-account.json');",
            'const mockRecordId = mockGetRecord.id;',
        ].join('\n');
    }

    get codeStepFourB() {
        return [
            "it('sets the lightning-formatted-text to the @wire-provided account name', () => {",
            '    // create the component under test, set properties, emit @wire data, and attach to the DOM',
            "    const element = createElement('c-playground', { is: Playground});",
            '    element.recordId = mockRecordId;',
            "    // emit @wire data before attaching to DOM so it's part of the first render",
            '    getRecordWireAdapter.emit(mockGetRecord);',
            '    document.body.appendChild(element);',
            '',
            '    // select element to test and verify',
            "    const name = element.querySelector('lightning-formatted-text');",
            '    expect(name.value).toBe(mockGetRecord.fields.Name.value);',
            '});',
        ].join('\n');
    }

    get gitJsonData() {
        return getGitPath('/lightningcomponents/playground/__tests__/data/record-account.json');
    }

    get gitPlaygroundFinished() {
        return getGitPath('/lightningcomponents/playground_finished/__tests__/playground_finished.test.js');
    }
}
