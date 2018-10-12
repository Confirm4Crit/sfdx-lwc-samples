const RECORD_ID_KEY = 'recordId';

/**
 * Stores the record id value in localstorage.
 * @param {String} recordId the record id.
 */
export function setRecordId(recordId) {
    try {
        localStorage.setItem(RECORD_ID_KEY, recordId);
    } catch (e) {
        // intentional noop
    }
}
/**
 * Restores the record id from local storage to the provided component.
 */
export function restoreRecordId() {
    try {
        return localStorage.getItem(RECORD_ID_KEY);
    } catch (e) {
        // intentional noop
    }
    return undefined;
}
