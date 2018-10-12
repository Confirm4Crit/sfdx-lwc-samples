import { execFileSync } from 'child_process';
import assert from 'assert';

const FRONTDOOR_URL = '/secur/frontdoor.jsp';
const ONE_APP_URL = '/one/one.app';
const TAB_URL_PREFIX = '/lightning/n/';

export default class TestUtil {
    /**
     * Create a test util object for UI tests
     * @param {Browser} browser -- WebdriverIO Browser Object
     */
    constructor(browser) {
        this.browser = browser;
        this.orgDetail = JSON.parse(execFileSync('sfdx', ['force:org:display', '--json'])).result;
        this.instance = this.orgDetail.instanceUrl;
    }

    /**
     * Login to the default scratch org, using access token retrived from 'sfdx force:org:display'
     */
    login() {
        try {
            const token = this.orgDetail.accessToken;
            this.browser.url(`${this.instance}${FRONTDOOR_URL}?sid=${token}&retURL=${ONE_APP_URL}`);
            this.browser.waitForExist('one-appnav');
        } catch (e) {
            assert.fail(
                'Unable to successfully log into Lightning Experience.\n' +
                    'Look for error screenshots in ui-test/errorshots directory.\n' +
                    `Error Details: ${e.message}`,
            );
        }
        const appName = 'Lightning Web Components';
        const appNameElem = this.browser.$(`span[title='${appName}']`);

        if (appNameElem && appNameElem.type === 'NoSuchElement') {
            assert.fail(
                `We did not land on the "${appName}" application after logging in.\n` +
                    'This is possibly due to you using the scratch org for manual testing, and selecting some other app (e.g. Sales) as the default.',
            );
        }
    }

    /**
     * Navigate to the tab specified and perform a visual comparison against the 'gold' screenshot.
     * If 'gold' screenshot does not exist, one is created for the test author to review + commit.
     * @param {string} tabName - dev name of the tab
     */
    diffTab(tabName) {
        this.diffUrl(TAB_URL_PREFIX + tabName);
    }

    diffUrl(url, waitForCallback) {
        this.browser.url(this.instance + url);
        if (waitForCallback) {
            waitForCallback();
        } else {
            // if the caller hasn't provided waitForCallback, just wait a few seconds before
            // proceeding with screen capture and visual diff
            this.browser.pause(8000);
        }
        const report = this.browser.checkDocument();
        this.assertDiff(report, url);
    }

    assertDiff(results, url) {
        results.forEach(result =>
            assert.ok(
                result.isWithinMisMatchTolerance,
                'Visual differences found between the current and the expected screenshot.\n' +
                    'Please visit https://github.com/forcedotcom/sfdx-lwc-samples/tree/master/ui-tests ' +
                    'for help with analyzing visual regression failures.\n' +
                    `Details: pageUrl=${url}, mismatchPercentage=${result.misMatchPercentage}`,
            ),
        );
    }
}
