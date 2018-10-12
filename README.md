# Lightning Web Components Examples & Playground - Winter 19 (216) [![CircleCI](https://circleci.com/gh/forcedotcom/sfdx-lwc-samples/tree/master.svg?style=svg&circle-token=8a2145726cca012a413c1015abd94914571fc7c3)](https://circleci.com/gh/forcedotcom/sfdx-lwc-samples/tree/master)

This repository provides instructive samples for Lightning Web Components. The sample components illustrate basic techniques and recommended practices. The samples are commented, and we welcome feedback, questions, and pull requests.

## Lightning Web Components Pilot

Lightning Web Components is a new and exciting way to write components for use with Salesforce. Lightning web components are designed to align closely with existing web standards, such as the emerging Web Components standard. Components use JavaScript syntax and programming models that are similar to other JavaScript app development frameworks.

Lightning web components are currently available as an invitation-only private pilot for a limited set of customers. You should only have access to this repository if you're a part of the [pilot](https://org62.lightning.force.com/one/one.app#/chatter/record/0F90M0000004r9GSAQ).

### Forward Looking Statements

We provide Lightning Web Components to selected customers through a pilot program that requires agreement to specific terms and conditions. Lightning Web Components is subject to change and isn’t generally available unless or until Salesforce announces its general availability in documentation or in press releases or public statements. We can’t guarantee general availability within any particular time frame or at all. Make your purchase decisions only on the basis of generally available products and features.

### Required

To work with this samples repo, install these tools.

- **An Org Configured as a Dev Hub**

    We recommend that you use a Dev Hub org dedicated to the pilot, and don't mix your Lightning web components evaluation with your normal development efforts.

    * <a href="https://developer.salesforce.com/promotions/orgs/dx-signup" target="_blank">Salesforce DX org sign-up</a>

    The pilot coordinator must enable Lightning Web Components for your Dev Hub org. Send the Dev Hub org ID to the pilot coordinator via the [**Lightning Web Components - Pilot**](https://org62.lightning.force.com/one/one.app#/chatter/record/0F90M0000004r9GSAQ) Chatter group.

    To find your org ID, from Setup, enter *company* in the **Quick Find** box, then select **Company Information**.

- **The Salesforce CLI and `salesforcedx` Plugin.**

    To install the Salesforce CLI, start here: <a href="https://developer.salesforce.com/tools/sfdxcli" target="_blank">Salesforce CLI</a>

    If you've already installed the Salesforce CLI, update your plugins.
    ```bash
    sfdx plugins:update
    ```

    The installed version of the salesforcedx plugin must support API version 42.0 or later. Check the API version.
    ```bash
    sfdx plugins --core
    ```
- **Git**

   Install [Git](https://help.github.com/articles/set-up-git/)

- **Node.js**

   Install [Node.js](https://nodejs.org)

### Highly Recommended Tools

We want you to enjoy developing Lightning web components as much as we do, so we've created an extension for Visual Studio Code that provides code completion, static analysis, compiler validation as you type, and lots more. You can also run Salesforce CLI commands right from Visual Studio Code. We're really looking forward to your feedback about these tools, so we hope you use them!

* Install [Visual Studio Code](https://code.visualstudio.com/)

* Install [Salesforce Extensions for VS Code](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode)

* Install [LWC Code Editor for Visual Studio](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode-lwc)

    To learn how to use the extension, check out the [ReadMe](/docs/README_vscode_extension.md).

## Clone the Samples Repo

<a href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line" target="_blank"> Create a Personal Access Token in GitHub</a> and use it as your password when you clone the samples repo.

```bash
cd path/to/your/sfdx/projects
git clone https://github.com/forcedotcom/sfdx-lwc-samples.git
cd sfdx-lwc-samples
```

Install npm dependencies.

```bash
npm install
```

The result is a directory formatted as a Salesforce DX project that you can work with immediately.

## Authorize a Dev Hub

Authorize the Dev Hub org that's enabled for the Lightning Web Components pilot. You only need to do this once per project.

If you installed Visual Studio Code, launch it and open the sfdx-lwc-samples folder. To open the Command Palette, press Command + Shift P. Enter `sfdx` and select this command:
**SFDX: Authorize a Dev Hub**

Enter your Dev Hub org credentials in the browser that opens. After you log in successfully, you can close the browser.

You can also run this command from the command line.

```bash
sfdx force:auth:web:login -d -a lwc-hub
```

## Development Workflow

Here's a summary of how you can iteratively modify and explore the samples included in this repository.

### Create a Scratch Org

In VS Code, press Command + Shift P to open the Command Palette. Enter `sfdx` and select this command:
**SFDX: Create a Default Scratch Org**

You can also run this command from the command line.

```bash
sfdx force:org:create -s -f config/project-scratch-def.json -a scratch-1
```

This creates a scratch org where you can load your code and then run it.

### Push Your Code

In VS Code, press Command + Shift P to open the Command Palette. Enter `sfdx p` and select this command:
**SFDX: Push Source to Default Scratch Org**

You can also run this command from the command line.

```bash
sfdx force:source:push
```

### View the Lightning Web Component Samples

In VS Code, press Command + Shift P to open the Command Palette. Enter `sfdx o` and select this command:
**SFDX: Open Default Scratch Org**

You can also run this command from the command line.

```bash
sfdx force:org:open -p /lightning/n/welcome
```

This command opens a web browser, connects to your scratch org, and logs in. If the Lightning Web Components app isn't displayed, select it from the App Launcher. Follow the on-screen instructions to build your first Lightning web component.

### Create Unit Tests

Write automated tests for your custom components to ensure they work as designed. We recommend you use the Jest testing framework. We extended Lightning Testing Service (LTS) to make testing of Lightning web components with Jest a breeze right out of the box. For more information, see:

[lts-jest Readme](/docs/README_lts_jest.md)

### Lather, Rinse, Repeat

Use VS Code to make changes to your code, push your code, and refresh the browser to see the changes. Poke around, modify our code, and create your own code. We hope you'll find Lightning web components as exciting as we do, and fun!
