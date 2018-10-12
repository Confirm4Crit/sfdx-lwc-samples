# Visual Regression Testing

This directory contains visual regression tests. They work by running the Lightning web components in Chrome (headless), capturing the appearance, and comparing it to previously captured versions.

## Prerequisites

Before running the UI tests, please ensure the following:

*  'defaultusername' is set. This can be done in multiple ways,
    * `sfdx force:org:create -s` at the time of scratch org creation.
    * `sfdx force:config:set defaultusername=me@my.org` at a later time.
*  Samples metadata is pushed to the scratch org via `sfdx force:source:push`.

## Running the Tests

In the project root directory:

```
npm install
npm run test:ui
```

## Analyzing Errors

When the tests detect a visual difference, an error is reported. Examine these files to evaluate whether the change is intended and should be accepted.

* `ui-tests/screenshots/diffs/` - a visual "diff" between the current and expected appearance
* `ui-tests/screenshots/current/` - the current appearance based on your local code
* `ui-tests/screenshots/expected/` - the expected appearance

If a difference listed in `ui-tests/screenshots/diffs` is desired, copy the new version from `ui-tests/screenshots/current/` to `ui-tests/screenshots/expected/` and commit the file to git.
