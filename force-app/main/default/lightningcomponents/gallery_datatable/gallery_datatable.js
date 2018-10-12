import { Element, track, wire } from 'engine';
import { getGitPath } from 'c-utils';
import { getListUi, MRU } from 'lightning-ui-api-list-ui';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

/**
 * Gets a field value by recursing through spanned records.
 * @param {Object} record The record holding the field.
 * @param {string[]} field Field to retrieve.
 */
function getFieldValue(record, field) {
    const f = field.shift();
    const value = record.fields[f].value;
    if (field.length === 0) {
        return value;
    }
    return getFieldValue(value, field);
}

/**
 * Sample demonstrating lightning-datatable and @wire(getListUi).
 */
export default class GalleryDatatable extends Element {
    @track message;
    @track columns;
    @track data;

    @wire(getListUi, { objectApiName: ACCOUNT_OBJECT, listViewApiName: MRU })
    wiredList({ data, error }) {
        if (error) {
            this.message = error.errorCode + ' - ' + error.message;
            this.columns = undefined;
            this.data = undefined;
        } else if (data) {
            this.message = undefined;

            // extract the column info
            this.columns = data.info.displayColumns.map(column => {
                return {
                    label: column.label,
                    fieldName: column.fieldApiName,
                    type: 'text',
                };
            });

            // extract the row data
            this.data = data.records.records.map(record => {
                return this.columns.reduce(
                    (row, column) => {
                        const field = column.fieldName.split('.');
                        row[column.fieldName] = getFieldValue(record, field);
                        return row;
                    },
                    { id: record.id },
                );
            });
        }
    }

    get hasData() {
        return !!(this.columns && this.data && this.data.length > 0);
    }

    get hasNoData() {
        return !!(this.columns && this.data && this.data.length === 0);
    }

    handleNewRecord() {
        this.message = 'Create more records or reload the page to populate the table.';
    }

    get gitSource() {
        return getGitPath('/lightningcomponents/gallery_datatable');
    }
}
