import { Element, wire, track, api } from 'engine';
import { objectToTreeGridData, treeGridColumns } from 'c-utils';
import { getRecordUi } from 'lightning-ui-api-record-ui';

/**
 * Component that visualizes Lightning Data Service's @wire(getRecordUi).
 */
export default class LdsRecordUi extends Element {
    /**
     * Setter for recordId property. Resets UI and triggers @wire reload.
     * @param {String} value new record id.
     */
    set recordId(value) {
        this.error = undefined;
        this.recordUi = undefined;
        this.recordIds = value ? [value] : undefined;
    }

    /** Getter for recordId property. */
    @api
    get recordId() {
        return this.recordIds ? this.recordIds[0] : undefined;
    }

    /** Ids of records to load. */
    recordIds;

    /** RecordUi response and calculated values. */
    @track recordUi;
    @track recordCount;
    @track objectInfoCount;
    @track recordUiAsJson;
    @track treeGridData;
    @track error;

    /**
     * Record UI wire. The method is invoked when new data is received. The expensive
     * transformations are run only when new data is received, not on each render.
     * @param {Object} error an error if one occurred, otherwise undefined.
     * @param {Object} data the record ui payload, or undefined if an error occurred.
     */
    @wire(getRecordUi, { recordIds: '$recordIds', layoutTypes: ['Full'], modes: ['View'] })
    wiredRecordUi({ error, data }) {
        if (error) {
            this.error = JSON.stringify(error);
            this.recordUi = undefined;
        } else if (data) {
            this.error = undefined;
            this.recordUi = data;
            this.recordUiAsJson = JSON.stringify(data, null, 2);
            this.recordCount = Object.keys(data.records).length;
            this.objectInfoCount = Object.keys(data.objectInfos).length;

            // Generate the data for lightning-tree-grid.
            this.treeGridData = objectToTreeGridData(data);
        }
    }

    /**
     * Gets column data for lightning-tree-grid.
     * Row data is in this.treeGridData.
     */
    get treeGridColumns() {
        return treeGridColumns;
    }

    /**
     * Gets whether a record id has been provided.
     */
    get hasRecordIds() {
        return !!this.recordIds;
    }
}
