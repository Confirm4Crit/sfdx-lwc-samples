const { jestConfig } = require('lts-jest/config');
module.exports = {
    ...jestConfig,
    // playground_finished requires lightning-record-view-form to have a slot to do any meaningful testing so override the default mock to include a slot in the template
    moduleNameMapper: {
        '^lightning-record-view-form$':
            '<rootDir>/force-app/test/jest-mocks/lightning-record-view-form/lightning-record-view-form.js',
    },
};
