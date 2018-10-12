/**
 * A boolean normalization utility for attributes.
 * @param {Any} value - The value to normalize.
 * @return {Boolean} - The normalized value.
 */
export function normalizeBoolean(value) {
    return typeof value === 'string' || !!value;
}
