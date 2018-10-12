import { Element, track, api, wire } from 'engine';
import { refreshApex } from '@salesforce/apex';
import getActivityHistory from '@salesforce/apex/GalleryApexController.getActivityHistory';
import logCall from '@salesforce/apex/GalleryApexController.logCall';
import CALL_DURATION_IN_SECONDS_FIELD from '@salesforce/schema/ActivityHistory.CallDurationInSeconds';

/**
 * Calculates duration summary of ActivityHistory calls.
 * @param {ActivityHistory[]} activities ActivityHistory objects to summarize
 * @return {Object} Summary of call durations.
 */
function calculateDurations(activities) {
    const durations = {
        '< 1 min': 0,
        '< 5 min': 0,
        '> 5 min': 0,
    };
    activities.forEach(activity => {
        const duration = activity[CALL_DURATION_IN_SECONDS_FIELD.fieldApiName];
        if (duration === undefined) {
            durations.Unknown = (durations.Unknown || 0) + 1;
        } else if (duration < 60) {
            durations['< 1 min']++;
        } else if (duration < 300) {
            durations['< 5 min']++;
        } else {
            durations['> 5 min']++;
        }
    });
    return Object.entries(durations).map(entry => {
        return { label: entry[0], value: entry[1] };
    });
}

export default class GalleryApexMaster extends Element {
    /** The Account record, to which new Calls are associated. */
    @api recordId;

    /** Status message. */
    @track message = '';

    /** Call duration summaries. */
    @track durations = calculateDurations([]);

    /** Table columns for call duration summaries. */
    get durationColumns() {
        // for localized labels from object metadata, use @wire(getObjectInfo, { objectApiName: ActivityHistoryObject })
        return [
            { label: 'Duration', fieldName: 'label', type: 'text' },
            { label: 'Count', fieldName: 'value', type: 'number' },
        ];
    }

    /** Form data for new call. */
    form = { subject: 'Call', comments: '', duration: 1 };

    /** Reference to @wire(Apex) result so it may be refreshed. */
    wiredActivities;

    @wire(getActivityHistory, { accountId: '$recordId', max: '500' })
    wiredGetActivityHistory(value) {
        // hold onto the provisioned value so we may later refresh it
        this.wiredActivities = value;

        if (value.error) {
            this.durations = undefined;
            return;
        }
        if (value.data) {
            this.durations = calculateDurations(value.data);
        }
    }

    /**
     * Handler for Log A Call form input.
     */
    handleChange(evt) {
        const field = evt.target.dataset.fieldName;
        const value = evt.detail.value.trim();
        this.form[field] = value;
    }

    /**
     * Handler to Log A Call.
     */
    handleLogACall() {
        this.message = 'Logging call...';
        // Imperative invocation of Apex
        logCall({
            accountId: this.recordId,
            subject: this.form.subject,
            comments: this.form.comments,
            // W-4320896 - coerce to string to workaround integer conversion issues
            duration: '' + parseInt(this.form.duration, 10) * 60,
        })
            .then(() => {
                this.message = 'Call logged. Refreshing data.';
                // Data changed so re-fetch @wire(Apex) to display new summary. gallery_apex_detail
                // is notified of new data because it @wire'd to the same Apex method.
                return refreshApex(this.wiredActivities);
            })
            .then(() => {
                this.message = 'Call logged. Data refreshed.';
            })
            .catch(e => {
                this.message = 'Error logging call or refreshing data: ' + e.toString();
            });
    }
}
