import { Element, track } from 'engine';
import { getGitPath, restoreRecordId, setRecordId } from 'c-utils';
import samplesLightningComponentComplete from '@salesforce/resource-url/samples_lightning_component_complete';

/**
 * The Lightning components tab.
 */
export default class LightningComponents extends Element {
    @track recordId;

    /**
     * Lifecycle method. Restore the record id, if it exists, for improved cross-tab navigation.
     */
    connectedCallback() {
        this.recordId = restoreRecordId();
    }

    /**
     * Handler for new record event.
     * @param {Event} evt change event.
     */
    handleNewRecord(evt) {
        const recordId = evt.detail.data.id;
        // updating this.recordId cascades to playground and LDS explorer
        this.recordId = recordId;
        setRecordId(recordId);
    }

    get samplesLightningComponentCompleteUrl() {
        return samplesLightningComponentComplete;
    }

    get codeGreetingsWorld() {
        return ['<template>', '    Greetings, Lightning Web Components!', '</template>'].join('\n');
    }

    get codeStepOne() {
        return [
            '<template>',
            '    <div>',
            '       <lightning-avatar variant="circle" src="" size="large" fallback-icon-name="standard:account" alternative-text="Tesla"></lightning-avatar>',
            '   </div>',
            '   <div>',
            '       <lightning-formatted-text value="Tesla" class="slds-text-heading_large"></lightning-formatted-text>',
            '   </div>',
            '</template>',
        ].join('\n');
    }

    get codeStepTwo() {
        return [
            '<template>',
            '    <lightning-record-view-form record-id={recordId} object-api-name="Account">',
            '        <lightning-output-field field-name="Website"></lightning-output-field>',
            '        <lightning-output-field field-name="Industry"></lightning-output-field>',
            '        <lightning-output-field field-name="AnnualRevenue"></lightning-output-field>',
            '        <lightning-output-field field-name="OwnerId"></lightning-output-field>',
            '    </lightning-record-view-form>',
            '</template>',
        ].join('\n');
    }

    get codeStepThree() {
        return [
            '<template>',
            '    <div class="slds-card">',
            '        <lightning-record-view-form record-id={recordId} object-api-name="Account">',
            '            <div class="slds-grid slds-wrap slds-p-around_small">',
            '                <div class="slds-col slds-size_2-of-4 slds-p-vertical_xx-small">',
            '                    <lightning-output-field field-name="Website"></lightning-output-field>',
            '                    <lightning-output-field field-name="Industry"></lightning-output-field>',
            '                </div>',
            '                <div class="slds-col slds-size_2-of-4 slds-p-vertical_xx-small">',
            '                    <lightning-output-field field-name="AnnualRevenue"></lightning-output-field>',
            '                    <lightning-output-field field-name="OwnerId"></lightning-output-field>',
            '                </div>',
            '            </div>',
            '        </lightning-record-view-form>',
            '    </div>',
            '</template>',
        ].join('\n');
    }

    get codeStepFour() {
        return [
            '<template>',
            '    <div class="slds-card">',
            '        <lightning-record-view-form record-id={recordId} object-api-name="Account">',
            '            <div class="slds-grid slds-wrap slds-p-around_small">',
            '                <div class="slds-col slds-size_1-of-1 slds-p-vertical_xx-small">',
            '                    <div class="slds-media">',
            '                        <div class="slds-media__figure">',
            '                            <lightning-avatar variant="circle" size="large" fallback-icon-name="standard:account" alternative-text="Tesla"></lightning-avatar>',
            '                        </div>',
            '                        <div class="slds-media__body">',
            '                            <lightning-formatted-text value="Tesla" class="slds-text-heading_large"></lightning-formatted-text>',
            '                        </div>',
            '                    </div>',
            '                </div>',
            '                <div class="slds-col slds-size_2-of-4 slds-p-vertical_xx-small">',
            '                    <lightning-output-field field-name="Website"></lightning-output-field>',
            '                    <lightning-output-field field-name="Industry"></lightning-output-field>',
            '                </div>',
            '                <div class="slds-col slds-size_2-of-4 slds-p-vertical_xx-small">',
            '                    <lightning-output-field field-name="AnnualRevenue"></lightning-output-field>',
            '                    <lightning-output-field field-name="OwnerId"></lightning-output-field>',
            '                </div>',
            '            </div>',
            '        </lightning-record-view-form>',
            '    </div>',
            '</template>',
        ].join('\n');
    }

    get gitAccountCreator() {
        return getGitPath('/lightningcomponents/account_creator');
    }
}
