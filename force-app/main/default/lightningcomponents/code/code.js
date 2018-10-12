import { Element, api } from 'engine';
import { classSet, normalizeBoolean } from 'c-utils';

/**
 * Component to display formatted code.
 */
export default class Code extends Element {
    /** True if the code is meant for input by the user. */
    @api input = false;

    get computedClasses() {
        return classSet()
            .add({ input: normalizeBoolean(this.input) })
            .toString();
    }
}
