import { Element, api } from 'engine';
import { classSet, normalizeBoolean } from 'c-utils';

/**
 * A card component.
 */
export default class Card extends Element {
    /** Card header. */
    @api header;

    /** (Boolean) Is this card nested. */
    @api nested = false;

    /** (Boolean) Should this card have a boundary. */
    @api boundary = false;

    /** (Boolean) Should the card be joined to the header. */
    @api joined = false;

    get computedClasses() {
        return classSet('slds-card')
            .add({
                'slds-card-wrapper': normalizeBoolean(this.joined),
                'slds-has-top-magnet': normalizeBoolean(this.joined),
                'slds-card__nested': normalizeBoolean(this.nested),
                'slds-card_boundary': normalizeBoolean(this.boundary),
            })
            .toString();
    }
}
