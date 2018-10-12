import { Element, wire, track } from 'engine';
import { objectToTreeGridData, treeGridColumns, getGitPath } from 'c-utils';
import { getObjectInfo } from 'lightning-ui-api-object-info';

/**
 * Sample demonstrating Lightning Data Service's @wire(getObjectInfo).
 */
export default class GalleryLdsObjectInfo extends Element {
    /** API name of the Object to load */
    objectApiName;

    /** Collects Object API name as it is entered. */
    _objectApiName = '';

    /** Object Info response and calculated values. */
    @track objectInfo;
    @track fieldCount;
    @track childRelationshipCount;
    @track objectInfoAsJson;
    @track treeGridData;
    @track error;

    /**
     * Object Info wire. The method is invoked when new data is received. The expensive
     * transformations are run only when new data is received, not on each render.
     * @param {Object} error an error if one occurred, otherwise undefined.
     * @param {Object} data the object info, or undefined if an error occurred.
     */
    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    wiredObjectInfo({ error, data }) {
        if (error) {
            this.error = JSON.stringify(error);
            this.objectInfo = undefined;
        } else if (data) {
            this.error = undefined;
            this.objectInfo = data;
            this.objectInfoAsJson = JSON.stringify(data, null, 2);
            this.fieldCount = Object.keys(data.fields).length;
            this.childRelationshipCount = Object.keys(data.childRelationships).length;

            // Generate the data for lightning-tree-grid.
            this.treeGridData = objectToTreeGridData(data);
        }
    }

    /**
     * Change handler for Object API Name input element.
     * @param {Event} evt change event.
     */
    handleChange(evt) {
        this._objectApiName = evt.detail.value;
    }

    /** Handler for 'Load Object Info' button. **/
    handleLoadClick() {
        this.objectApiName = this._objectApiName.trim();
        this.error = undefined;
        this.objectInfo = undefined;
    }

    /**
     * Gets column data for lightning-tree-grid.
     * Row data is in this.treeGridData.
     */
    get treeGridColumns() {
        return treeGridColumns;
    }

    get gitSource() {
        return getGitPath('/lightningcomponents/gallery_lds_object_info');
    }
}
