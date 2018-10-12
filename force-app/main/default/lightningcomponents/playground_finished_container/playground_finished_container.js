import { Element, track } from 'engine';
import { restoreRecordId, setRecordId, getGitPath } from 'c-utils';

/**
 * Tab for the completed version of the playground component.
 */
export default class PlaygroundFinishedContainer extends Element {
    /** Record id to display in playground. */
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

    /**
     * Gets whether a record id has been provided.
     */
    get hasRecordId() {
        return !!this.recordId;
    }

    get gitSource() {
        return getGitPath('/lightningcomponents/playground_finished');
    }

    get gitSourceTests() {
        return getGitPath('/lightningcomponents/playground_finished/__tests__');
    }
}
