import { Element } from 'engine';

import noEvents from '@salesforce/resource-url/no_events';
import appTabsUx from '@salesforce/resource-url/app_tabs_ux';
import samplesAppTabsFlow from '@salesforce/resource-url/samples_app_tabs_flow';
import samplesLightningComponentFlow from '@salesforce/resource-url/samples_lightningcomponent_flow';

import { GIT_URL, getGitPath } from 'c-utils';

/**
 * The welcome tab.
 */
export default class Welcome extends Element {
    get noEventsUrl() {
        return noEvents;
    }

    get appTabsUxUrl() {
        return appTabsUx;
    }

    get samplesAppTabsFlowUrl() {
        return samplesAppTabsFlow;
    }

    get samplesLightningComponentFlowUrl() {
        return samplesLightningComponentFlow;
    }

    get git() {
        return GIT_URL;
    }

    get gitLightningComponents() {
        return getGitPath('/lightningcomponents');
    }

    get gitLwcAppMeta() {
        return getGitPath('/applications/LWC.app-meta.xml');
    }

    get gitTabs() {
        return getGitPath('/tabs');
    }

    get gitLightningComponentsWrapper() {
        return getGitPath('/aura/lightningComponentsWrapper');
    }

    get gitLightningComponent() {
        return getGitPath('/lightningcomponents/lightning_components');
    }

    get gitFlexipageIntegrationMeta() {
        return getGitPath('/flexipages/flexipage_integration.flexipage-meta.xml');
    }

    get codeLightningComponentsTab() {
        return [
            '<CustomTab xmlns="http://soap.sforce.com/2006/04/metadata">',
            '    <auraComponent>lightningComponentsWrapper</auraComponent>',
            '    <label>Lightning Components</label>',
            '    ...',
            '</CustomTab>',
        ].join('\n');
    }

    get codeLightningComponentsWrapper() {
        return [
            '<aura:component implements="force:appHostable">',
            '   <c:lightning_components/>',
            '</aura:component>',
        ].join('\n');
    }
}
