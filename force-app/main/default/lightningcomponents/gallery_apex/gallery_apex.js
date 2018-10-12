import { Element, track } from 'engine';
import { restoreRecordId, setRecordId, getGitPath } from 'c-utils';

export default class GalleryApex extends Element {
    /** Account record id. */
    @track recordId;

    /**
     * Lifecycle method. Restore the record id, if it exists.
     */
    connectedCallback() {
        this.recordId = restoreRecordId();
    }

    /**
     * Gets whether a record id has been provided.
     */
    get hasRecordId() {
        return !!this.recordId;
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

    get gitSource() {
        return getGitPath('/lightningcomponents/gallery_apex');
    }
}
