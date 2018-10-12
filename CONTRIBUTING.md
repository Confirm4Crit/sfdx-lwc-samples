## Documentation Guidelines for Samples

These samples are used for on-boarding to Lightning Web Components. Each sample must have a clear learning objective.

* Use JSDoc format for classes, public properties and methods, and functions.
* Document the learning objective on the JavaScript class.
* Spell check your comments and code.
* Err on the side of being verbose.

It's strongly recommended to configure your editor as described below. It will assist with these requirements.

## Prerequisites

Configure the project using the steps in the root [README](README.md). You must authenticate to your org and create a scratch org to run the visual regression tests.

## System Requirements

* [Node 8.x](https://nodejs.org/en/)
* NPM 5.x

## Editor Configurations

Configuring your editor to use our lint and code style rules to simplify your development experience and expedite the pull request review.

### editorconfig

[Configure your editor](http://editorconfig.org/#download) to use our editor configurations.

### Spell Checker

Configure your editor to use your favorite spell checker.

## Useful Development Workflow Commands

### Install Dependencies

```bash
npm install
```

#### Lint Your Changes

```bash
npm run lint
```

#### Test Your Changes

Changes must pass functional unit tests and visual regression tests. Visual regression tests require a scratch org.

```bash
npm run test
```

See [this document](ui-tests/README.md) for how to understand and fix visual regression failures.

## Git Workflow

We use [Github Flow](https://guides.github.com/introduction/flow/index.html) so all code changes happen through pull requests. We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes. Don't forget the visual regression tests.
4. Make sure your code passes the linter.
5. Issue the pull request!
