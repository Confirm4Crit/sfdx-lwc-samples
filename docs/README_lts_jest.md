# lts-jest

The Lightning Testing Service (LTS) now supports the Jest testing framework for Lightning web components. This enhancement takes care of setup and configuration so you can start unit testing your Lightning web components quickly.

## Usage

```
Run Jest unit tests in an SFDX workspace

Options:
  --version             Show version number                                               [boolean]
  --help                Show help                                                         [boolean]
  --advancedMode, -a    For advanced users only. Pass all CLI arguments directly to Jest  [boolean] [default: false]
  --coverage            Collect coverage and display in output                            [boolean] [default: false]
  --updateSnapshot, -u  Re-record every snapshot that fails during a test run             [boolean] [default: false]
  --verbose             Display individual test results with the test suite hierarchy     [boolean] [default: false]
  --watch               Watch files for changes and rerun tests related to changed files  [boolean] [default: false]
```

## Resolving External Lightning Web Components

Any Lightning web components not located in your local `lightningcomponents` directory of your SFDX workspace will need to be mocked in your Jest tests. Components from the `lightning` namespace, e.g. `<lightning-button>`, will be automatically mocked out during unit tests run by `lts-jest`. These mocks are very simple skeleton implementations that have the public properties of each component exposed, but no functionality implemented.

### Other Component Mocks

For components from other namespaces, not in your local `lightningcomponents` directory, you'll need to create your own mock and update the Jest config to map the name of these components to the mock file.

Let's go through an example. Given the following template we want to test:

```html
<template>
    Hello from a Lightning web component
    <lightning-button onclick={doSomething}></lightning-button>
    <foo-button onclick={doSomethingElse}></foo-button>
</template>
```

We know out of the box the `lightning-button` will be handled by the package automatically. `foo-button`, however, will need to be resolved. In our `jest.config.js` file at the root of the SFDX project workspace, add the following:

```js
const { jestConfig } = require('lts-jest/config');
module.exports = {
    ...jestConfig,
    moduleNameMapper: {
        '^foo-button$': '<rootDir>/force-app/test/jest-mocks/foo-button',
    }
};
```

This will tell Jest to map the import for `foo-button` to the provided file. Here, `<rootDir>` will map to the root of the SFDX workspace. Note that this file location is not required, just an example. You also have the freedom to make these mock implementations as sophisticated or simple as you'd like. In this example, we'll make `foo-button` extremely simple with an empty template and no functionality in the .js file, but you can always add whatever markup you'd like or implement functionality like any other Lightning web component.

Finally, we need to create the mock `foo-button` files. In the `force-app/test/jest-mocks` directory create the following files:

```html
<!-- foo-button.html -->
<template></template>
```

```js
// foo-button.js
import { Element, api } from 'engine';
export default class FooButton extends Element {
  @api label
  // any other @api properties or implementation you may want to expose here
}
```

## Passing Additional Jest CLI Options

To pass any additional Jest CLI options to your run, set the `--advancedMode` flag. When this flag is set, all other CLI parameters will be passed along directly to Jest.

```bash
lts-jest test --advancedMode --json
```

See the Jest [doc](http://facebook.github.io/jest/docs/en/cli.html) for all CLI options.

## Overriding Jest Config

`lts-jest` will set up all the necessary Jest [configs](http://facebook.github.io/jest/docs/en/configuration.html) for you to run tests out of the box without any additional tweaks. To override any options or set additional ones, import the default config from `lts-jest`, modify as you please, and then export the new config.

```js
const { jestConfig } = require('lts-jest/config');
module.exports = {
    ...jestConfig,
    testMatch: ['**/todo.test.js'],
};
```
