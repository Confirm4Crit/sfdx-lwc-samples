import { Element, track } from 'engine';

/** Date-time formatter. */
const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });

/** Name of custom event X. */
const eventNameX = 'customeventx';

/**
 * Sample demonstrating events in Lightning web components and Aura.
 */
export default class EventsContainer extends Element {
    /** Received events as formatted string. */
    @track receivedEvents = '';

    /** Whether to stop propagation of event X */
    stopPropagationX = false;

    /**
     * Handler to receive custom events from child component.
     * @param {Event} evt the received custom event.
     */
    handleCustomEvent(evt) {
        const now = formatter.format(Date.now());
        const type = evt.type;
        const payload = evt.detail.data;
        // Add to front for reverse chronological order.
        this.receivedEvents = `${now}, event type: ${type}, payload: ${payload}\n${this.receivedEvents}`;

        if (this.stopPropagationX && type === eventNameX) {
            evt.stopPropagation();
        }
    }

    /**
     * Handler for 'Stop propagation' button.
     * @param {Event} evt change event.
     */
    handlePropagationXClick(evt) {
        this.stopPropagationX = evt.detail.checked;
    }

    /**
     * Handler for 'Listen to Event Y' button.
     * @param {Event} evt change event.
     */
    handleListenClick(evt) {
        const eventName = 'customeventy';
        const enabled = evt.detail.checked;

        // programmatically enable/disable listening for event Y
        if (enabled) {
            this.addEventListener(eventName, this.handleCustomEvent);
        } else {
            this.removeEventListener(eventName, this.handleCustomEvent);
        }
    }
}
