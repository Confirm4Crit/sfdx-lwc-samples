/* import items from the LWC framework */
import { Element, api } from 'engine';

export default class Playground extends Element {
    /** Id of record to display. */
    @api recordId;
}
