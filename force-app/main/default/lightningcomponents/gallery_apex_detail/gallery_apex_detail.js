import { Element, track, api, wire } from 'engine';
import getActivityHistory from '@salesforce/apex/GalleryApexController.getActivityHistory';
import START_DATE_TIME_FIELD from '@salesforce/schema/ActivityHistory.StartDateTime';
import SUBJECT_FIELD from '@salesforce/schema/ActivityHistory.Subject';
import DESCRIPTION_FIELD from '@salesforce/schema/ActivityHistory.Description';
import CALL_DURATION_IN_SECONDS_FIELD from '@salesforce/schema/ActivityHistory.CallDurationInSeconds';

export default class GalleryApexDetail extends Element {
    /** The Account record whose calls are displayed */
    @api recordId;

    @track rows;

    // Load activity history. Same Apex method is used by gallery_apex_master, which performs DML
    // then refreshes its @wire. That results in all components using the Apex method to be notified
    // of the new data.
    @wire(getActivityHistory, { accountId: '$recordId', max: '500' })
    wiredGetActivityHistory(value) {
        if (value.error) {
            this.rows = [];
            return;
        }
        if (value.data) {
            this.rows = value.data;
        }
    }

    get columns() {
        return [
            { label: 'Date', fieldName: START_DATE_TIME_FIELD.fieldApiName, type: 'date-local' },
            { label: 'Subject', fieldName: SUBJECT_FIELD.fieldApiName, type: 'text' },
            { label: 'Comments', fieldName: DESCRIPTION_FIELD.fieldApiName, type: 'text' },
            { label: 'Duration (sec)', fieldName: CALL_DURATION_IN_SECONDS_FIELD.fieldApiName, type: 'number' },
        ];
    }
}
