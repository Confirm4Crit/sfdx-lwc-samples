import { Element } from 'engine';

/**
 * Sample demonstrating firing events.
 */
export default class EventsChild extends Element {
    /** The custom payload value. */
    payload = '';

    /**
     * Change handler for payload.
     * @param {Event} evt change event.
     */
    handleChange(evt) {
        this.payload = evt.detail.value;
    }

    /**
     * Handler for 'Fire Event' button.
     * @param {Event} evt click event.
     */
    handleClick(evt) {
        const eventName = evt.currentTarget.dataset.eventName;
        const event = new CustomEvent(eventName, {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: { data: this.payload },
        });
        this.dispatchEvent(event);
    }
}
