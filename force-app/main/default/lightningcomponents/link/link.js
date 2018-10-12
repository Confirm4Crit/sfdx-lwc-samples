import { Element, track, api } from 'engine';
import { NavigationMixin } from 'lightning-navigation';

// Winter 19 mixin workaround (W-5180125)
import tmpl from './link.html';

function createTabPageReference(tabApiName) {
    return {
        type: 'standard__navItemPage',
        attributes: {
            apiName: tabApiName,
        },
    };
}

function createObjectHomePageReference(objectApiName) {
    return {
        type: 'standard__objectPage',
        attributes: {
            objectApiName,
            actionName: 'list',
        },
    };
}

/**
 * Displays a link for navigation. Currently limited to navigating to a tab or object home page.
 */
export default class Link extends NavigationMixin(Element) {
    /** Label for link. */
    @api label;

    /**  API name of target tab. */
    @api tabApiName;

    /** API name of target object. */
    @api objectApiName;

    /** Display variant: text (default), button. */
    @api variant = 'text';

    /** Calculated URL. */
    @track url;

    /** Create a page reference based on properties. */
    createPageReference() {
        if (this.tabApiName !== undefined) {
            return createTabPageReference(this.tabApiName);
        } else if (this.objectApiName !== undefined) {
            return createObjectHomePageReference(this.objectApiName);
        }
        throw new Error('Unknown link target');
    }

    /**
     * Generate URL for use on <a href> so right-click, etc works.
     */
    connectedCallback() {
        const pageReference = this.createPageReference();
        this[NavigationMixin.GenerateUrl](pageReference).then(url => {
            this.url = url;
        });
    }

    /** Handler for clicking the link. */
    handleClick(evt) {
        evt.preventDefault();
        const pageReference = this.createPageReference();
        this[NavigationMixin.Navigate](pageReference);
    }

    get isTextVariant() {
        return this.variant === 'text';
    }

    get isButtonVariant() {
        return this.variant === 'button';
    }

    // Winter 19 mixin workaround (W-5180125)
    render() {
        return tmpl;
    }
}
