/* Primitives from LWC framework */
import { createElement } from 'engine';
/* Component to test */
import PlaygroundFinished from 'c-playground_finished';
/* Jest utility to control @wire adapters */
import { registerLdsTestWireAdapter } from 'wire-service-jest-util';
/* @wire adapter to control */
import { getRecord } from 'lightning-ui-api-record';

// mock the @wire(getRecord) so the test may control data/error flow
const getRecordWireAdapter = registerLdsTestWireAdapter(getRecord);

/*
 * Mock out lightning-navigation mixin. For unit testing purposes we want to
 * verify that NavigationMixin.Navigate() is invoked with the correct payload.
 */
jest.mock(
    'lightning-navigation',
    () => {
        const Navigate = jest.fn();
        const NavigationMixin = Base => {
            return class extends Base {
                [Navigate] = Navigate;
            };
        };
        NavigationMixin.Navigate = Navigate;
        return { NavigationMixin };
    },
    { virtual: true },
);

/*
 * Import a snapshot of getRecord's response for functional verification. This eliminates
 * the need to connect to an org to retrieve data, which allows for running all unit tests
 * on localhost (aka offline).
 *
 * This data can be captured using a REST client accessing the UI API resource which the
 * @wire(getRecord) represents. Documentation for this UI API resource is at
 * https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_resources_record_get.htm
 *
 * Community-provided instructions for access Salesforce REST resources is at
 * https://blog.mkorman.uk/using-postman-to-explore-salesforce-restful-web-services/
 */
const mockGetRecord = require('./data/record-account.json');
const mockRecordId = mockGetRecord.id;

describe('c-playground_finished', () => {
    afterEach(() => {
        // the jsdom instance is shared across test cases in a single file so remove all
        // test artifacts from the DOM prior to running each test
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        // prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    it('sets lightning-avatar source', () => {
        // create the component under test
        const element = createElement('c-playground_finished', { is: PlaygroundFinished });
        // set the properties
        element.recordId = mockRecordId;
        // attach the component to the DOM
        document.body.appendChild(element);

        // select the avatar element
        const avatar = element.querySelector('lightning-avatar');
        // verify the src value matches the value from the @salesforce/resource-url mock above
        expect(avatar.src).toBe('salesforce_logo');
    });

    it('sets lightning-avatar fallback icon', () => {
        // create the component under test, set properties, and attach to the DOM
        const element = createElement('c-playground_finished', { is: PlaygroundFinished });
        element.recordId = mockRecordId;
        document.body.appendChild(element);

        // select element to test and verify
        const avatar = element.querySelector('lightning-avatar');
        expect(avatar.fallbackIconName).toBe('standard:account');
    });

    it('sets the lightning-formatted-text to the @wire-provided account name', () => {
        // create the component under test, set properties, emit @wire data, and attach to the DOM
        const element = createElement('c-playground_finished', { is: PlaygroundFinished });
        element.recordId = mockRecordId;
        // emit @wire data before attaching to DOM so it's part of the first render
        getRecordWireAdapter.emit(mockGetRecord);
        document.body.appendChild(element);

        // select element to test and verify
        const name = element.querySelector('lightning-formatted-text');
        expect(name.value).toBe(mockGetRecord.fields.Name.value);
    });

    it('invokes NavigationMixin.Navigate with recordId when edit button is clicked', () => {
        const expectedRecordId = mockRecordId;
        const expectedActionName = 'edit';

        // create the component under test, set properties, emit @wire data, and attach to the DOM
        const element = createElement('c-playground_finished', { is: PlaygroundFinished });
        element.recordId = expectedRecordId;
        document.body.appendChild(element);

        // select element to trigger behavior
        const button = element.querySelector('lightning-button-icon');
        button.click();

        // verify behavior: inspect the params our mock was called with. for full documentation on
        // Jest mocks see https://facebook.github.io/jest/docs/en/mock-function-api.html#mockfnmockcalls
        const navigate = require('lightning-navigation').NavigationMixin.Navigate;
        expect(navigate.mock.calls).toHaveLength(1);
        const payload = navigate.mock.calls[0][0];
        expect(payload.attributes.recordId).toBe(expectedRecordId);
        expect(payload.attributes.actionName).toBe(expectedActionName);
    });

    it('renders c-playground_finished without recordId specified', () => {
        // create the component under test
        const element = createElement('c-playground_finished', { is: PlaygroundFinished });
        // attach the component to the DOM
        document.body.appendChild(element);
        // compares to the snapshot, or generates one if there's none
        expect(element).toMatchSnapshot();
    });

    it('renders c-playground_finished with recordId', () => {
        // create the component under test, set properties, emit @wire data, and attach to the DOM
        const element = createElement('c-playground_finished', { is: PlaygroundFinished });
        element.recordId = mockRecordId;
        document.body.appendChild(element);

        // compares to the snapshot, or generates one if there's none
        expect(element).toMatchSnapshot();
    });
});
