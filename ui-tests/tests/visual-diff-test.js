import TestUtil from './test-util';

describe('Visual regression', () => {
    const testUtil = new TestUtil(browser);
    before(() => {
        testUtil.login();
    });
    it('"Welcome" tab', () => {
        testUtil.diffTab('welcome');
    });
    it('"Lightning Components" tab', () => {
        testUtil.diffTab('lightning_components');
    });
    it('"Lightning Data Service" tab', () => {
        testUtil.diffTab('lds');
    });
    it('"Navigation" tab', () => {
        testUtil.diffTab('navigation');
    });
    it('"External References" tab', () => {
        testUtil.diffTab('external_references');
    });
    it('"Lightning Pages" tab', () => {
        testUtil.diffTab('flexipage');
    });
    it('"Testing" tab', () => {
        testUtil.diffTab('testing');
    });
    it('"Playground Finished" tab', () => {
        testUtil.diffTab('playground_finished');
    });
    it('"Gallery" tab', () => {
        testUtil.diffTab('gallery');
    });
});
